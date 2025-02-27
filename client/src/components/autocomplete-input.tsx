import React, { useEffect, useRef, forwardRef } from "react";
import { loader } from "@/lib/maps-loader";
import { Input } from "./ui/input";

export type TAutocompleteData = {
  street: string;
  city: string;
  state: string;
  zip: string;
  fullAddress: string;
  location:
    | google.maps.LatLng
    | google.maps.LatLngLiteral
    | {
        lat: number;
        lng: number;
      };
};

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  getAddress: (data: TAutocompleteData) => void;
  updateValue?: (val: string) => void;
}

export const AutocompleteInput = forwardRef<HTMLInputElement, InputProps>(
  ({ getAddress, updateValue, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
      null,
    );

    useEffect(() => {
      let autocomplete: google.maps.places.Autocomplete;

      const initAutocomplete = async () => {
        await loader.importLibrary("places");

        if (inputRef.current && window.google) {
          autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
            types: ["geocode"],
            componentRestrictions: { country: "us" },
          });

          autocompleteRef.current = autocomplete;

          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            const addressComponents =
              place.address_components as google.maps.GeocoderAddressComponent[];

            let street = "";
            let city = "";
            let state = "";
            let zip = "";

            console.log(place);
            console.log(place.geometry?.location?.lat());
            console.log(place.geometry?.location?.lng());

            addressComponents.forEach((component) => {
              const types = component.types;
              if (types.includes("premise")) {
                street = component.long_name;
              } else if (types.includes("street_number")) {
                street = component.long_name;
              } else if (types.includes("route")) {
                street += " " + component.long_name;
              } else if (
                [
                  "locality",
                  "neighborhood",
                  "administrative_area_level_3",
                ].some((str) => types.includes(str))
              ) {
                city = component.long_name;
              } else if (types.includes("administrative_area_level_1")) {
                state = component.short_name;
              } else if (types.includes("postal_code")) {
                zip = component.long_name;
              }
            });

            const serializedSata: TAutocompleteData = {
              street,
              city,
              state,
              zip,
              fullAddress: place.formatted_address!,
              location: {
                lat: place.geometry?.location?.lat() as number,
                lng: place.geometry?.location?.lng() as number,
              },
            };

            getAddress(serializedSata);
          });
        }
      };

      initAutocomplete().catch((error) =>
        console.error("Error loading Google Maps:", error),
      );

      return () => {
        const ele = document.querySelectorAll(".pac-container");
        for (const e of ele) {
          e.remove();
        }
      };
    }, []);

    useEffect(() => {
      setTimeout(() => {
        document.body.style.pointerEvents = "auto"; // Ensure interactions with suggestions
        // const pacContainers =
        //   document.querySelectorAll<HTMLElement>(".pac-container");
        // pacContainers.forEach((container) => {
        //   container.style.pointerEvents = "auto"; // Ensure interactions with suggestions
        // });
      }, 0);
    }, []);

    // To make `.pac-container` interactive in a Dialog
    // useEffect(() => {
    //   setTimeout(() => {
    //     const ele = document.querySelectorAll(".pac-container");
    //     for (const e of ele) {
    //       if (e instanceof HTMLElement) {
    //         e.style.zIndex = "100000";
    //         e.style.pointerEvents = "auto";
    //       }
    //     }
    //   }, 0);
    // }, []);

    // Use the forwarded ref
    useEffect(() => {
      if (typeof ref === "function") {
        ref(inputRef.current);
      } else if (ref) {
        ref.current = inputRef.current;
      }
    }, [ref]);

    return <Input ref={inputRef} {...props} />;
  },
);

AutocompleteInput.displayName = "AutocompleteInput";
