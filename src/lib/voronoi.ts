import { Delaunay } from 'd3'

export type VoronoiTile<T> = {
  datum: T
  polygon: [number, number][]
}

export function voronoi<T>({
  data,
  x,
  y,
  bounds,
}: {
  data: T[]
  x: (d: T) => number
  y: (d: T) => number

  // Bounds of the voronoi diagram [minX, minY, maxX, maxY]
  bounds: [number, number, number, number]
}): VoronoiTile<T>[] {
  const delunay = Delaunay.from(data, x, y)
  const voronoi = delunay.voronoi(bounds)

  return data.map((d, i) => ({
    datum: d,
    point: [x(d), y(d)],
    polygon: voronoi.cellPolygon(i) as [number, number][],
  }))
}
