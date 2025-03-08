import React from 'react';

interface Location {
    id: string;
    name?: string;
    path: string;
}

interface MapData {
    viewBox: string;
    locations: Location[];
    label?: string;
}

interface SVGMapProps {
    map: MapData;
    className?: string;
    role?: string;
    locationClassName?: string | ((location: Location, index: number) => string);
    locationTabIndex?: string | ((location: Location, index: number) => string);
    locationRole?: string;
    locationAriaLabel?: (location: Location, index: number) => string;
    onLocationMouseOver?: (event: React.MouseEvent<SVGPathElement>, location: Location, index: number) => void;
    onLocationMouseOut?: (event: React.MouseEvent<SVGPathElement>, location: Location, index: number) => void;
    onLocationMouseMove?: (event: React.MouseEvent<SVGPathElement>, location: Location, index: number) => void;
    onLocationClick?: (event: React.MouseEvent<SVGPathElement>, location: Location, index: number) => void;
    onLocationKeyDown?: (event: React.KeyboardEvent<SVGPathElement>, location: Location, index: number) => void;
    onLocationFocus?: (event: React.FocusEvent<SVGPathElement>, location: Location, index: number) => void;
    onLocationBlur?: (event: React.FocusEvent<SVGPathElement>, location: Location, index: number) => void;
    isLocationSelected?: (location: Location, index: number) => boolean;
    childrenBefore?: React.ReactNode;
    childrenAfter?: React.ReactNode;
}

const SVGMap = (props: SVGMapProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={props.map.viewBox}
            className={props.className}
            role={props.role}
            aria-label={props.map.label}
        >
            {props.childrenBefore}
            {props.map.locations.map((location, index) => (
                <path
                    key={location.id}
                    id={location.id}
                    name={location.name}
                    d={location.path}
                    className={
                        typeof props.locationClassName === 'function'
                            ? props.locationClassName(location, index)
                            : props.locationClassName
                    }
                    tabIndex={
                        typeof props.locationTabIndex === 'function'
                            ? Number(props.locationTabIndex(location, index))
                            : Number(props.locationTabIndex)
                    }
                    role={props.locationRole}
                    aria-label={props.locationAriaLabel ? props.locationAriaLabel(location, index) : location.name}
                    aria-checked={props.isLocationSelected ? props.isLocationSelected(location, index) : undefined}
                    onMouseOver={(event) => props.onLocationMouseOver?.(event, location, index)}
                    onMouseOut={(event) => props.onLocationMouseOut?.(event, location, index)}
                    onMouseMove={(event) => props.onLocationMouseMove?.(event, location, index)}
                    onClick={(event) => props.onLocationClick?.(event, location, index)}
                    onKeyDown={(event) => props.onLocationKeyDown?.(event, location, index)}
                    onFocus={(event) => props.onLocationFocus?.(event, location, index)}
                    onBlur={(event) => props.onLocationBlur?.(event, location, index)}
                />
            ))}
            {props.childrenAfter}
        </svg>
    );
};

SVGMap.defaultProps = {
    className: 'svg-map',
    role: 'none',
    locationClassName: 'svg-map__location',
    locationTabIndex: '0',
    locationRole: 'none',
};

export default SVGMap;
