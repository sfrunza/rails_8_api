// import { useEffect, useMemo, useRef } from "react";
// import { TAddress } from "@/types/request";
// import markerBlue from "@/assets/marker-blue-2.jpeg";
// import markerGreen from "@/assets/marker-green-2.jpeg";
// import markerRed from "@/assets/marker-red-2.jpeg";

// import { cn } from "@/lib/utils";
// import { loader } from "@/lib/maps-loader";

// export default function Map({
//   origin,
//   destination,
//   stops,
//   className,
// }: {
//   origin: TAddress;
//   destination: TAddress;
//   stops: TAddress[];
//   className?: string;
// }) {
//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const googleMapRef = useRef<google.maps.Map | null>(null);
//   const directionsServiceRef = useRef<google.maps.DirectionsService | null>(
//     null,
//   );
//   const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(
//     null,
//   );

//   // Memoize map data (origin, destination, stops) to prevent unnecessary re-renders
//   const memoizedData = useMemo(() => {
//     return { origin, destination, stops };
//   }, [origin, destination, stops]);

//   // Initialize map and render directions & markers
//   useEffect(() => {
//     const initializeMap = async () => {
//       try {
//         await loader.importLibrary("maps");
//         await loader.importLibrary("marker");

//         if (!mapRef.current || googleMapRef.current) return;

//         // Initialize the map
//         googleMapRef.current = new google.maps.Map(mapRef.current, {
//           center: memoizedData.origin.location,
//           zoom: 20,
//           zoomControl: false,
//           streetViewControl: false,
//           mapTypeControl: false,
//           fullscreenControl: false,
//           scrollwheel: true,
//           mapId: "95afa0b4f6947c49",
//           mapTypeId: google.maps.MapTypeId.ROADMAP,
//         });

//         // Set up Directions Service and Renderer
//         directionsServiceRef.current = new google.maps.DirectionsService();
//         directionsRendererRef.current = new google.maps.DirectionsRenderer({
//           suppressMarkers: true,
//           polylineOptions: { strokeWeight: 3, strokeColor: "#4AB5FB" },
//         });
//         directionsRendererRef.current.setMap(googleMapRef.current);

//         // Calculate and display route
//         const routeRequest: google.maps.DirectionsRequest = {
//           origin: memoizedData.origin.location,
//           destination: memoizedData.destination.location,
//           waypoints: memoizedData.stops?.map((stop) => ({
//             location: new google.maps.LatLng(
//               stop.location.lat,
//               stop.location.lng,
//             ),
//             stopover: true,
//           })),
//           travelMode: google.maps.TravelMode.DRIVING,
//         };

//         directionsServiceRef.current.route(routeRequest, (result, status) => {
//           if (status === google.maps.DirectionsStatus.OK) {
//             directionsRendererRef.current?.setDirections(result);
//             // Adjust the map zoom and center to fit the route
//             const bounds = result?.routes[0].bounds;
//             if (bounds) {
//               googleMapRef.current?.fitBounds(bounds);
//             }
//           } else {
//             console.error("Error fetching directions:", status);
//           }
//         });

//         // Add custom markers
//         const originImg = createMarkerImage(markerGreen);
//         const destinationImg = createMarkerImage(markerRed);
//         const stopImg = createMarkerImage(markerBlue);

//         addMarker(memoizedData.origin.location, originImg);
//         addMarker(memoizedData.destination.location, destinationImg);

//         memoizedData.stops?.forEach((stop) => {
//           addMarker(stop.location, stopImg);
//         });
//       } catch (error) {
//         console.error("Error loading Google Maps:", error);
//       }
//     };

//     initializeMap();

//     // Clean-up function to reset refs
//     return () => {
//       googleMapRef.current = null;
//       directionsServiceRef.current = null;
//       directionsRendererRef.current = null;
//     };
//   }, [JSON.stringify(memoizedData)]);

//   // Helper function to create marker images
//   const createMarkerImage = (src: string): google.maps.marker.PinElement => {
//     const img = document.createElement("img");
//     img.src = src;
//     img.style.width = "18px";
//     img.style.height = "22px";
//     return new google.maps.marker.PinElement({ glyph: img, scale: 0.1 });
//   };

//   // Helper function to add markers to the map
//   const addMarker = (
//     position: google.maps.LatLngLiteral,
//     content: google.maps.marker.PinElement,
//   ) => {
//     new google.maps.marker.AdvancedMarkerElement({
//       position,
//       map: googleMapRef.current,
//       content: content.element,
//     });
//   };

//   return (
//     <div
//       className={cn(
//         "relative flex min-h-60 w-full flex-col items-center justify-center gap-1 lg:h-full",
//         className,
//       )}
//     >
//       <div
//         ref={mapRef}
//         style={{ height: "100%", width: "100%", margin: "auto" }}
//       />
//     </div>
//   );
// }
