import React from 'react';
import { HeadphonesModel } from './HeadphonesModel';
import { SunglassesModel } from './SunglassesModel';
import { WatchModel } from './WatchModel';
import { SneakerModel } from './SneakerModel';
import { BackpackModel } from './BackpackModel';
import { PerfumeModel } from './PerfumeModel';
import { LampModel } from './LampModel';
import { CameraModel } from './CameraModel';

export function ModelRenderer({
  productId,
  color,
  metalness,
  roughness,
  isHovered = false,
  floating = true,
  ...props
}) {
  switch (productId) {
    case 'nova-one':
      return (
        <HeadphonesModel
          color={color}
          metalness={metalness}
          roughness={roughness}
          isHovered={isHovered}
          floating={floating}
          {...props}
        />
      );
    case 'nova-arc':
      return (
        <SunglassesModel
          color={color}
          metalness={metalness}
          roughness={roughness}
          isHovered={isHovered}
          floating={floating}
          {...props}
        />
      );
    case 'nova-time':
      return (
        <WatchModel
          color={color}
          metalness={metalness}
          roughness={roughness}
          isHovered={isHovered}
          floating={floating}
          {...props}
        />
      );
    case 'nova-air':
      return (
        <SneakerModel
          color={color}
          metalness={metalness}
          roughness={roughness}
          isHovered={isHovered}
          floating={floating}
          {...props}
        />
      );
    case 'nova-pack':
      return (
        <BackpackModel
          color={color}
          metalness={metalness}
          roughness={roughness}
          isHovered={isHovered}
          floating={floating}
          {...props}
        />
      );
    case 'nova-scent':
      return (
        <PerfumeModel
          color={color}
          metalness={metalness}
          roughness={roughness}
          isHovered={isHovered}
          floating={floating}
          {...props}
        />
      );
    case 'nova-light':
      return (
        <LampModel
          color={color}
          metalness={metalness}
          roughness={roughness}
          isHovered={isHovered}
          floating={floating}
          {...props}
        />
      );
    case 'nova-cam':
      return (
        <CameraModel
          color={color}
          metalness={metalness}
          roughness={roughness}
          isHovered={isHovered}
          floating={floating}
          {...props}
        />
      );
    default:
      return (
        <HeadphonesModel
          color={color}
          metalness={metalness}
          roughness={roughness}
          isHovered={isHovered}
          floating={floating}
          {...props}
        />
      );
  }
}
