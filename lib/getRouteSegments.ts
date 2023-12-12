type GetRouteSegments = {
    firstRouteSegment: string  | null,
    secondRouteSegment: string | null,
    thirdRouteSegment: string  | null
}
const getRouteSegments = (path: string): GetRouteSegments => {
    const paths: string[] = path.replace(/\/$/, '').split('/');
    paths.shift();
    return {
        firstRouteSegment: paths[0] || null,
        secondRouteSegment: paths[1] || null,
        thirdRouteSegment: paths[2] || null
    }
}

export default getRouteSegments;