import { useEffect, useState } from "react";

export function usePuzzleImages(
    levelId: number,
    hasStarted: boolean
) {
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!hasStarted) {
            setImages([]);
            setIsLoading(false);
            return;
        }

        let cancelled = false;

        setIsLoading(true);
        setImages([]);

        const minimumLoadingDelay = new Promise<void>((resolve) => {
            window.setTimeout(resolve, 1000);
        });

        const path = `/levels/${levelId}`;

        const imagePaths = [1, 2, 3, 4].map(
            num => `${path}/${num}.webp`
        );

        const preloadImages = async () => {
            await Promise.all([
                Promise.all(
                    imagePaths.map(
                        src =>
                            new Promise<void>((resolve) => {
                                const img = new Image();

                                img.src = src;

                                img.onload = () => resolve();
                                img.onerror = () => resolve();
                            })
                    )
                ),
                minimumLoadingDelay,
            ]);

            if (!cancelled) {
                setImages(imagePaths);
                setIsLoading(false);
            }
        };

        void preloadImages();

        return () => {
            cancelled = true;
        };
    }, [levelId, hasStarted]);

    return {
        images,
        isLoading,
    };
}