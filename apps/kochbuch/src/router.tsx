import type { AnchorHTMLAttributes, FC, ReactElement, ReactNode } from "react";
import {
	Children,
	createContext,
	isValidElement,
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

const getNormalizedPath = (): string => {
	const hash = window.location.hash;
	let path = "/";

	if (hash.startsWith("#!/")) {
		path = hash.substring(2);
	} else if (hash.startsWith("#/")) {
		path = hash.substring(1);
	} else if (hash.startsWith("#!")) {
		path = hash.substring(2);
	} else if (hash.startsWith("#")) {
		path = hash.substring(1);
	}

	if (path === "") return "/";
	return path.startsWith("/") ? path : `/${path}`;
};

const useHashNavigation = () => {
	const [currentPath, setCurrentPath] = useState(getNormalizedPath());
	const prevPathRef = useRef<string>(getNormalizedPath());

	useEffect(() => {
		if ("scrollRestoration" in window.history) {
			window.history.scrollRestoration = "manual";
		}

		const handleHashChange = () => {
			const newPath = getNormalizedPath();
			const oldPath = prevPathRef.current;

			const scrollPos = { x: window.scrollX, y: window.scrollY };
			sessionStorage.setItem(
				`scroll_pos:${oldPath}`,
				JSON.stringify(scrollPos)
			);

			prevPathRef.current = newPath;
			setCurrentPath(newPath);
		};

		window.addEventListener("hashchange", handleHashChange);
		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);

	useLayoutEffect(() => {
		const savedPos = sessionStorage.getItem(`scroll_pos:${currentPath}`);

		if (savedPos) {
			const { x, y } = JSON.parse(savedPos);
			window.scrollTo(x, y);
		} else {
			window.scrollTo(0, 0);
		}
	}, [currentPath]);

	return { currentPath };
};

type RouteParams = { [key: string]: string };

const RouteContext = createContext<RouteParams | null>(null);

export const useParams = (): RouteParams => {
	const context = useContext(RouteContext);
	if (context === null) {
		throw new Error(
			"useParams() must be used inside a matched <Route> component.",
		);
	}
	return context;
};

type MatchResult = {
	match: boolean;
	params: RouteParams;
};

const matchRoute = (routePath: string, currentPath: string): MatchResult => {
	const routeSegments = routePath.split("/").filter(Boolean);
	const currentSegments = currentPath.split("/").filter(Boolean);

	if (routeSegments.length !== currentSegments.length) {
		return { match: false, params: {} };
	}

	const params: RouteParams = {};

	for (let i = 0; i < routeSegments.length; i++) {
		const routeSeg = routeSegments[i];
		const currentSeg = currentSegments[i];

		if (routeSeg.startsWith(":")) {
			const paramName = routeSeg.substring(1);
			params[paramName] = currentSeg;
		} else if (routeSeg !== currentSeg) {
			return { match: false, params: {} };
		}
	}

	return { match: true, params };
};

type LinkProps = {
	to: string;
	children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export const Link: FC<LinkProps> = ({ to, children, ...rest }) => {
	const href = `#!${to.startsWith("/") ? to : `/${to}`}`;
	return (
		<a href={href} {...rest}>
			{children}
		</a>
	);
};

export type RouteProps = {
	path: string;
	children: ReactNode;
};

export const Route: FC<RouteProps> = ({ children }) => {
	return <>{children}</>;
};

type RouterViewProps = {
	children: ReactElement<RouteProps> | ReactElement<RouteProps>[];
	notFoundComponent?: ReactNode;
};

export const RouterView: FC<RouterViewProps> = ({
	children,
	notFoundComponent = null,
}) => {
	const { currentPath } = useHashNavigation();

	let routeToRender: ReactNode = notFoundComponent;
	let routeParams: RouteParams = {};

	Children.forEach(children, (child) => {
		if (routeToRender !== notFoundComponent) {
			return;
		}

		if (isValidElement(child)) {
			const { match, params } = matchRoute(child.props.path, currentPath);

			if (match) {
				routeToRender = child;
				routeParams = params;
			}
		}
	});

	if (routeToRender !== notFoundComponent) {
		return (
			<RouteContext.Provider value={routeParams}>
				{routeToRender}
			</RouteContext.Provider>
		);
	}

	return <>{notFoundComponent}</>;
};

export const navigate = (to: string): void => {
	const hash = `#!${to.startsWith("/") ? to : `/${to}`}`;

	if (window.location.hash !== hash) {
		window.location.hash = hash;
	}
};
