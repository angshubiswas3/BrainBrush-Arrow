/**
 * Studio Coordinate Engine - Single Source of Truth for Grid Coordinate Mapping
 * 
 * Pipeline:
 * Browser Mouse Position (e.clientX, e.clientY)
 *   ↓
 * Subtract SVG Bounding Rect (rect.left, rect.top)
 *   ↓
 * Scale-Invariant Ratio (relX / rect.width, relY / rect.height)
 *   ↓
 * Grid World Position (fracCol, fracRow)
 *   ↓
 * Snap to Grid (Math.floor)
 *   ↓
 * (row, col)
 */

export function screenToGrid(e, svgElement, gridSize) {
  if (!svgElement || !gridSize) return null;

  const rect = svgElement.getBoundingClientRect();
  if (!rect || rect.width === 0 || rect.height === 0) return null;

  // 1. Browser Mouse Position
  const clientX = e.clientX;
  const clientY = e.clientY;

  // 2. Relative Position inside SVG Bounding Rect in Screen Pixels
  const relX = clientX - rect.left;
  const relY = clientY - rect.top;

  // Bounds check
  if (relX < 0 || relY < 0 || relX >= rect.width || relY >= rect.height) {
    return null;
  }

  // 3. Convert to Grid Cell Index (Scale-Invariant & Scroll-Invariant)
  const col = Math.floor((relX / rect.width) * gridSize.cols);
  const row = Math.floor((relY / rect.height) * gridSize.rows);

  // 4. Clamp to Grid Boundaries
  const c = Math.max(0, Math.min(gridSize.cols - 1, col));
  const r = Math.max(0, Math.min(gridSize.rows - 1, row));

  return { r, c };
}

/**
 * Grid to Screen Canvas Center Coordinates (for rendering text labels & overlays)
 */
export function gridToCanvasCenter(r, c, tileSize = 40) {
  return {
    x: c * tileSize + tileSize / 2,
    y: r * tileSize + tileSize / 2
  };
}

export default screenToGrid;
