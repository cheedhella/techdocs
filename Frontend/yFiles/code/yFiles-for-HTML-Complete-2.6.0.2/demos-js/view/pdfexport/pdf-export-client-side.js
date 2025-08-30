/****************************************************************************
 ** @license
 ** This demo file is part of yFiles for HTML 2.6.0.2.
 ** Copyright (c) 2000-2023 by yWorks GmbH, Vor dem Kreuzberg 28,
 ** 72070 Tuebingen, Germany. All rights reserved.
 **
 ** yFiles demo files exhibit yFiles for HTML functionalities. Any redistribution
 ** of demo files in source code or binary form, with or without
 ** modification, is not permitted.
 **
 ** Owners of a valid software license for a yFiles for HTML version that this
 ** demo is shipped with are allowed to use the demo source code as basis
 ** for their own yFiles for HTML powered applications. Use of such programs is
 ** governed by the rights and conditions as set out in the yFiles for HTML
 ** license agreement.
 **
 ** THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESS OR IMPLIED
 ** WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 ** MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN
 ** NO EVENT SHALL yWorks BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 ** SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 ** TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 ** PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 ** LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 ** NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 ** SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 **
 ***************************************************************************/
import { GraphComponent, Insets, Size, SvgExport, WebGL2GraphModelManager } from 'yfiles'
import { PaperSize } from './PaperSize.js'
import { useWebGL2Rendering } from './webgl-support.js'

// The demo uses the open-source library for PDF export https://github.com/MrRio/jsPDF alongside with
// https://github.com/yWorks/svg2pdf.js/ to convert a given SVG element to PDF
import { jsPDF } from 'jspdf'
import 'svg2pdf.js'

// Load custom fonts for the custom-fonts sample graph. This is ONLY required if you want to export Cyrillic or Hiragana characters.
// jsPDF supports the most common fonts out of the box. However, to register other custom fonts, please see
// https://github.com/MrRio/jsPDF#use-of-unicode-characters--utf-8
import './resources/fonts/prata-regular-normal.js'
import './resources/fonts/kosugi.js'

/**
 * @typedef {Object} ClientExportResult
 * @property {HTMLIFrameElement} iFrame
 */

/**
 * Exports the image on the client. This will open a dialog with a preview and the option to save the image as PNG.
 * @param {!GraphComponent} graphComponent
 * @param {number} scale
 * @param {number} margin
 * @param {!PaperSize} paperSize
 * @param {!Rect} [exportRectangle]
 * @returns {!Promise.<object>}
 */
export async function exportPdfClientSide(
  graphComponent,
  scale,
  margin,
  paperSize,
  exportRectangle
) {
  // configure export, export the PDF and show a dialog to save the PDF file
  const { raw, uri } = await exportPdf(
    graphComponent,
    scale,
    Insets.from(margin),
    paperSize,
    exportRectangle
  )

  const pdfIFrame = createPdfIFrame(raw, uri)

  return { pdfData: raw, previewElement: pdfIFrame }
}

/**
 * Exports the {@link IGraph} to PDF with the help of {@link SvgExport} and jsPDF in the client's browser.
 * yFiles {@link SvgExport} is used to export the contents of a {@link GraphComponent} into an
 * SVG document which is subsequently converted into a PDF document by jsPDF.
 * @param {!GraphComponent} graphComponent
 * @param {number} [scale=1]
 * @param {*} margins
 * @param {*} paperSize
 * @param {!Rect} [exportRect]
 * @returns {!Promise.<object>}
 */
export async function exportPdf(
  graphComponent,
  scale = 1,
  margins = Insets.from(5),
  paperSize = PaperSize.AUTO,
  exportRect
) {
  // Create a new graph component for exporting the original SVG content
  const exportComponent = new GraphComponent()
  // ... and assign it the same graph.
  exportComponent.graph = graphComponent.graph
  exportComponent.updateContentRect()

  if (graphComponent.graphModelManager instanceof WebGL2GraphModelManager) {
    useWebGL2Rendering(exportComponent)
  }

  // Determine the bounds of the exported area
  const targetRect = exportRect || exportComponent.contentRect

  // Create the exporter class
  const exporter = new SvgExport({
    worldBounds: targetRect,
    scale: scale,
    margins: margins,
    encodeImagesBase64: true,
    inlineSvgImages: true
  })

  // set cssStyleSheets to null so the SvgExport will automatically collect all style sheets
  exporter.cssStyleSheet = null

  // export the component to svg
  const svgElement = await exporter.exportSvgAsync(exportComponent)

  const size = getExportSize(paperSize, exporter)
  return convertSvgToPdf(svgElement, size)
}

/**
 * Converts the given SVG element to PDF.
 * @yjs:keep = compress,orientation
 * @param {!SVGElement} svgElement
 * @param {!Size} size
 * @returns {!Promise.<object>}
 */
function convertSvgToPdf(svgElement, size) {
  svgElement = svgElement.cloneNode(true)

  const sizeArray = [size.width, size.height]
  const jsPdf = new jsPDF({
    orientation: sizeArray[0] > sizeArray[1] ? 'l' : 'p',
    unit: 'pt',
    format: sizeArray,
    compress: true
  })

  const options = {
    width: sizeArray[0],
    height: sizeArray[1]
  }

  return jsPdf
    .svg(svgElement, options)
    .then(() => ({ raw: jsPdf.output(), uri: jsPdf.output('datauristring') }))
}

/**
 * Creates an IFrame containing a preview of the given pdf.
 * @param {!string} raw
 * @param {!string} pdfUrl
 * @returns {!HTMLIFrameElement}
 */
function createPdfIFrame(raw, pdfUrl) {
  const pdfIframe = document.createElement('iframe')
  pdfIframe.setAttribute('style', 'width: 99%; height: 99%')
  pdfIframe.src = pdfUrl
  return pdfIframe
}

/**
 * Returns the size of the exported PDF. Paper sizes are converted to pixel sizes based on 72 PPI.
 * @param {!PaperSize} paperSize
 * @param {!SvgExport} exporter
 * @returns {!Size}
 */
function getExportSize(paperSize, exporter) {
  switch (paperSize) {
    case PaperSize.A3:
      return new Size(842, 1191)
    case PaperSize.A4:
      return new Size(595, 842)
    case PaperSize.A5:
      return new Size(420, 595)
    case PaperSize.A6:
      return new Size(298, 420)
    case PaperSize.LETTER:
      return new Size(612, 792)
    case PaperSize.AUTO:
      return new Size(exporter.viewWidth, exporter.viewHeight)
  }
}
