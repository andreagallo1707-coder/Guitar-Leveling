import { jsPDF } from 'jspdf';
import { LickPrize, HunterProfile, GraphicTabSystem } from '../types';
import { buildProfessionalGraphicSystems } from './aiCoachEngine';

/**
 * Generate and download an authentic, professional vector sheet-music tablature PDF
 * complying strictly with:
 * - 3 to 4 complete systems (lines) spanning the FULL WIDTH of the page (A4)
 * - Exactly 4 measures per line with vertical bar lines and measure numbers
 * - Vector-drawn 6-string staff (not ASCII!), TAB clef, and masked fret numbers (knockout lines)
 */
export function generateRewardLickPdf(
  lick: LickPrize,
  hunterProfile: HunterProfile
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210 mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297 mm
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182 mm

  // 1. Top Header Banner
  doc.setFillColor(15, 15, 18);
  doc.rect(0, 0, pageWidth, 36, 'F');

  // Red accent top line
  doc.setFillColor(220, 38, 38);
  doc.rect(0, 0, pageWidth, 3, 'F');

  // Academy Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('GUITAR LEVELING ACADEMY', margin, 15);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(239, 68, 68);
  doc.text('PARTITURA UFFICIALE • ASSOLO & LICK PREMIO D\'ÉLITE', margin, 23);

  doc.setFontSize(8);
  doc.setTextColor(161, 161, 170);
  doc.text(`Data Rilascio: ${lick.unlockedAt || new Date().toLocaleDateString('it-IT')}`, margin, 30);

  doc.setTextColor(250, 204, 21);
  doc.setFont('helvetica', 'bold');
  doc.text(`GRADO: ${lick.rank}`, pageWidth - margin - 32, 15);

  // 2. Chitarrista & Specifiche Esecutive Box
  let y = 41;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`CHITARRISTA: ${hunterProfile.name.toUpperCase()} (LVL ${hunterProfile.level} - ${hunterProfile.hunterClass})`, margin + 4, y + 6);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Traguardo Conquistato: ${lick.title}`, margin + 4, y + 12);
  doc.text(`Tonalità: ${lick.key || 'La Minore (Am)'}   |   Tempo: ${lick.bpm} BPM (4/4)   |   Accordatura: ${lick.tuning || 'Standard E (E A D G B E)'}`, margin + 4, y + 17.5);

  // 3. Vector Tablature Systems (proportional to level/rank: 1 to 4 complete lines, 4 measures per line)
  const systems: GraphicTabSystem[] =
    lick.graphicSystems && lick.graphicSystems.length > 0
      ? lick.graphicSystems
      : buildProfessionalGraphicSystems(lick.category, lick.rank, lick.key);

  const numSystems = Math.max(1, Math.min(4, systems.length));
  y = 68;

  // Scale spacing according to the number of systems so the score fills the page harmoniously
  const staffTopSpacing = numSystems >= 4 ? 2.8 : 3.2; // mm between string lines
  const stringCount = 6;
  const staffHeight = (stringCount - 1) * staffTopSpacing; // 14 to 16 mm
  const systemSpacing = numSystems >= 4 ? 10.0 : numSystems === 3 ? 12.0 : numSystems === 2 ? 14.0 : 16.0;

  const clefWidth = 10; // mm for TAB clef
  const staffStartX = margin;
  const staffEndX = pageWidth - margin;
  const measuresStartX = staffStartX + clefWidth;
  const totalMeasuresWidth = staffEndX - measuresStartX;
  const measureWidth = totalMeasuresWidth / 4; // exactly 4 measures per line

  // Draw each active system
  systems.slice(0, numSystems).forEach((system, sIdx) => {
    const systemY = y + sIdx * (staffHeight + systemSpacing);

    // Draw the 6 horizontal string lines
    doc.setDrawColor(100, 116, 139);
    doc.setLineWidth(0.2);

    for (let str = 0; str < stringCount; str++) {
      const lineY = systemY + str * staffTopSpacing;
      doc.line(staffStartX, lineY, staffEndX, lineY);
    }

    // Draw the TAB Clef at the start of the system
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('T', staffStartX + 3, systemY + 3.5);
    doc.text('A', staffStartX + 3, systemY + 7.8);
    doc.text('B', staffStartX + 3, systemY + 12.2);

    // Initial measure double bar line
    doc.setDrawColor(71, 85, 105);
    doc.setLineWidth(0.4);
    doc.line(measuresStartX, systemY, measuresStartX, systemY + staffHeight);

    // Draw 4 measures in this system
    const measures = system.measures.slice(0, 4);
    measures.forEach((measure, mIdx) => {
      const mStartX = measuresStartX + mIdx * measureWidth;
      const mEndX = mStartX + measureWidth;

      // Draw Measure Number Box above the top line
      doc.setFillColor(241, 245, 249);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.2);
      doc.roundedRect(mStartX + 1, systemY - 3.8, 6.5, 3.2, 0.5, 0.5, 'FD');

      doc.setTextColor(100, 116, 139);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6);
      doc.text(String(measure.measureNumber), mStartX + 4.25, systemY - 1.5, { align: 'center' });

      // Draw Time Signature "4/4" in Measure 1
      if (sIdx === 0 && mIdx === 0) {
        doc.setTextColor(30, 41, 59);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.text('4', mStartX + 3, systemY + 5.5);
        doc.text('4', mStartX + 3, systemY + 11.0);
      }

      // Draw Notes with Knockout Background
      const notes = measure.notes || [];
      const noteCount = notes.length;

      notes.forEach((note, nIdx) => {
        const notePadding = sIdx === 0 && mIdx === 0 ? 9 : 4;
        const noteAvailableW = measureWidth - notePadding - 4;
        const noteX = mStartX + notePadding + (nIdx / Math.max(1, noteCount - 1)) * noteAvailableW;
        const noteY = systemY + (note.string - 1) * staffTopSpacing;

        // Knockout background rectangle
        const fretStr = String(note.fret);
        const rectW = fretStr.length > 1 ? 4.5 : 3.8;
        doc.setFillColor(255, 255, 255);
        doc.rect(noteX - rectW / 2, noteY - 1.7, rectW, 3.4, 'F');

        // Fret number
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.text(fretStr, noteX, noteY + 1.0, { align: 'center' });

        // Technique symbol (h, p, b, ~, pm, /)
        if (note.technique) {
          doc.setTextColor(185, 28, 28);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(6.5);
          doc.text(note.technique, noteX, noteY - 2.1, { align: 'center' });
        }
      });

      // Draw Vertical Bar Line at end of measure
      const isVeryLastMeasure = sIdx === numSystems - 1 && mIdx === 3;
      if (isVeryLastMeasure) {
        // Double bar line at final measure
        doc.setDrawColor(30, 41, 59);
        doc.setLineWidth(0.3);
        doc.line(mEndX - 1.2, systemY, mEndX - 1.2, systemY + staffHeight);
        doc.setLineWidth(0.8);
        doc.line(mEndX, systemY, mEndX, systemY + staffHeight);
      } else {
        doc.setDrawColor(100, 116, 139);
        doc.setLineWidth(0.3);
        doc.line(mEndX, systemY, mEndX, systemY + staffHeight);
      }
    });
  });

  // Calculate position right after the tablature systems
  const tabBottomY = y + numSystems * staffHeight + (numSystems - 1) * systemSpacing + 4;

  // 4. LEGENDA SIMBOLOGIE DELLA TABLATURA (Always included on every generated PDF)
  const legendY = tabBottomY;
  const legendH = 24;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, legendY, contentWidth, legendH, 1.5, 1.5, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('LEGENDA DELLE SIMBOLOGIE DI TABLATURA (NOTAZIONE UFFICIALE GUITAR LEVELING):', margin + 3.5, legendY + 5);

  doc.setFontSize(7.2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);

  // Column 1
  const col1X = margin + 3.5;
  doc.text('h = Hammer-on (martellato con mano sx)', col1X, legendY + 10.5);
  doc.text('p = Pull-off (strappato verso il basso)', col1X, legendY + 15.0);
  doc.text('b = Bending (piegatura verso l\'alto)', col1X, legendY + 19.5);

  // Column 2
  const col2X = margin + 64;
  doc.text('r = Release (rilascio del bending)', col2X, legendY + 10.5);
  doc.text('~ = Vibrato (oscillazione di polso)', col2X, legendY + 15.0);
  doc.text('pm = Palm Muting (smorzamento al ponte)', col2X, legendY + 19.5);

  // Column 3
  const col3X = margin + 124;
  doc.text('/ = Slide ascendente (verso il corpo)', col3X, legendY + 10.5);
  doc.text('\\ = Slide discendente (verso la paletta)', col3X, legendY + 15.0);
  doc.text('t = Right-Hand Tapping (tocco tastiera)', col3X, legendY + 19.5);

  // 5. Analisi Tecnica & Consigli del Coach (Bottom Section)
  const coachY = legendY + legendH + 3.5;
  const coachMaxH = pageHeight - 18 - coachY; // available height before footer
  const coachH = Math.max(38, Math.min(54, coachMaxH));

  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, coachY, contentWidth, coachH, 1.5, 1.5, 'FD');

  doc.setTextColor(153, 27, 27);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('ANALISI TECNICA & GUIDA DIDATTICA DEL COACH:', margin + 3.5, coachY + 5.5);

  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);

  const totalMeasures = numSystems * 4;
  const explanationText =
    lick.explanation ||
    `Questo assolo si articola su ${numSystems} ${
      numSystems === 1 ? 'sistema' : 'sistemi'
    } (${totalMeasures} battute a larghezza piena) proporzionato al livello per consolidare precisione e timing a ${lick.bpm} BPM. Esegui ogni battuta curando la dinamica e il muting delle corde a vuoto.`;

  const splitExplanation = doc.splitTextToSize(explanationText, contentWidth - 7);
  doc.text(splitExplanation.slice(0, 3), margin + 3.5, coachY + 11);

  // Bullet recommendations
  const adviceStartY = coachY + 22;
  if (coachH >= 46) {
    doc.setTextColor(185, 28, 28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('STRATEGIA DI STUDIO CONSIGLIATA:', margin + 3.5, adviceStartY);

    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(`1. Suddividi lo studio in blocchi da 4 battute (1 sistema alla volta) a ${Math.round(lick.bpm * 0.6)} BPM.`, margin + 3.5, adviceStartY + 4.8);
    doc.text('2. Cura il muting con la mano destra per impedire il risuonare spurio delle corde adiacenti.', margin + 3.5, adviceStartY + 9.2);
    doc.text(`3. Aumenta la velocità di 4 BPM solo quando completi tutte le ${totalMeasures} battute per 3 volte consecutive senza errori.`, margin + 3.5, adviceStartY + 13.6);
    doc.text('4. Nei bending e nei vibrati assicurati che l\'intonazione sia perfetta intonando prima il pitch target.', margin + 3.5, adviceStartY + 18.0);
  }

  // 6. Official Verification Footer
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Guitar Leveling Academy • Partitura Ufficiale • ${numSystems} ${numSystems === 1 ? 'Sistema' : 'Sistemi'} (${totalMeasures} Battute)`,
    margin,
    pageHeight - 9
  );

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text('Firma: GUITAR LEVELING MASTER COACH', pageWidth - margin - 60, pageHeight - 9);

  // Download PDF
  const cleanTitle = (lick.title || 'Assolo_Premio').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`GuitarLeveling_${cleanTitle}_${lick.bpm}BPM.pdf`);
}
