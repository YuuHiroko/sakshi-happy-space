
import React from 'react';

const PhotoCarousel3D = (props: any) => {
  // This is a placeholder component to prevent build errors.
  // The original PhotoCarousel3D was deleted, and this mock component
  // ensures the application flow remains intact by triggering the onPhotosViewed callback.
  React.useEffect(() => {
    if (props.isActive && props.onPhotosViewed) {
      // Automatically trigger the photos-viewed event to proceed with the scene.
      props.onPhotosViewed();
    }
  }, [props.isActive, props.onPhotosViewed]);

  return null; // Render nothing
};

export default PhotoCarousel3D;
