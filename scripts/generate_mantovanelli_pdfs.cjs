const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

const PDF_DIR = path.join(__dirname, '..', 'public', 'pdfs');
if (!fs.existsSync(PDF_DIR)) {
  fs.mkdirSync(PDF_DIR, { recursive: true });
}

// ---------------------------------------------------------------------------
// HELPER: DRAW JAMTRACKCENTRAL COVER PAGE (PAGE 1)
// ---------------------------------------------------------------------------
function drawCoverPage(doc, { title, masterclassLevel, subTitle, themeColor = [0, 180, 160] }) {
  const pageWidth = 210;
  const pageHeight = 297;

  // Background white
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Top header: JAMTRACKCENTRAL logo emblem & text
  doc.setFillColor(15, 15, 20);
  doc.rect(20, 18, 6, 6, 'F');
  doc.setFillColor(255, 255, 255);
  doc.circle(23, 21, 1.8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 15, 20);
  doc.text('JAMTRACKCENTRAL', 28, 23.5);

  // Top right "TAB" text in light grey
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(195, 200, 205);
  doc.text('TAB', 168, 24);

  // Top right guitarist silhouette placeholder graphic
  doc.setFillColor(240, 242, 245);
  doc.roundedRect(135, 38, 55, 30, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(120, 125, 135);
  doc.text('LUCA MANTOVANELLI', 143, 54);

  // Left cover box poster graphic (Color box with Mantovanelli portrait banner)
  const posterX = 22;
  const posterY = 55;
  const posterW = 68;
  const posterH = 88;

  doc.setFillColor(themeColor[0], themeColor[1], themeColor[2]);
  doc.rect(posterX, posterY, posterW, posterH, 'F');

  // Inner dark shade representing artist figure
  doc.setFillColor(15, 20, 25);
  doc.rect(posterX + 4, posterY + 4, posterW - 8, posterH - 8, 'F');

  // Poster text overlay
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('PENTATONICS', posterX + 7, posterY + 58);

  doc.setFontSize(8.5);
  doc.setTextColor(230, 230, 230);
  doc.text('MASTERCLASS', posterX + 16, posterY + 65);

  // Level badge on poster
  doc.setFillColor(themeColor[0], themeColor[1], themeColor[2]);
  doc.rect(posterX + 22, posterY + 68, 38, 6, 'F');
  doc.setFontSize(7);
  doc.setTextColor(10, 10, 15);
  doc.text(masterclassLevel.toUpperCase(), posterX + 27, posterY + 72.5);

  doc.setFontSize(6.5);
  doc.setTextColor(200, 205, 210);
  doc.text('LUCA MANTOVANELLI', posterX + 32, posterY + 82);

  // Right side typography
  const textX = 100;
  let textY = 92;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(30, 30, 35);
  doc.text('Luca Mantovanelli', textX, textY);

  textY += 9;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(10, 10, 15);
  doc.text('PENTATONICS', textX, textY);

  textY += 7.5;
  doc.text('MASTERCLASS:', textX, textY);

  textY += 8.5;
  doc.text(masterclassLevel.toUpperCase(), textX, textY);

  textY += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(15);
  doc.setTextColor(40, 40, 45);
  doc.text(title, textX, textY);

  // Horizontal divider line
  textY += 4;
  doc.setDrawColor(20, 20, 25);
  doc.setLineWidth(0.5);
  doc.line(textX, textY, textX + 85, textY);

  // JTC SAYS section
  textY += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 15, 20);
  doc.text('JTC SAYS:', textX, textY);

  textY += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 60);
  const jtcNote = 'Please refer to the main masterclass PDF for the details and concepts in this TAB file.';
  doc.text(doc.splitTextToSize(jtcNote, 85), textX, textY);

  // Bottom footer URL
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 15, 20);
  doc.text('WWW.JAMTRACKCENTRAL.COM', 128, 275);
}

// ---------------------------------------------------------------------------
// HELPER: DRAW PROMO ADVERTISEMENT PAGE (PAGE 2)
// ---------------------------------------------------------------------------
function drawPromoPage(doc, promoType = 'claudio') {
  doc.addPage();
  const pageWidth = 210;
  const pageHeight = 297;

  // Dark background theme for advertisement
  doc.setFillColor(20, 22, 26);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Diagonal "NEW RELEASE!" ribbon on top left
  doc.setFillColor(230, 210, 70);
  doc.triangle(0, 0, 55, 0, 0, 55, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 15, 20);
  doc.text('NEW RELEASE!', 8, 18, { angle: 45 });

  // Main title content depending on promoType
  let artistName = 'CLAUDIO PIETRONIK';
  let releaseTitle = 'FRETBOARD FREEDOM MASTERCLASS';
  let subHeader = 'DORIAN CONCEPTS';
  let bannerColor = [220, 38, 38]; // Red

  if (promoType === 'sfogli') {
    artistName = 'MARCO SFOGLI';
    releaseTitle = '20 HALF TIME SHUFFLE LICKS';
    subHeader = 'ROCK & FUSION SHUFFLE GROOVES';
    bannerColor = [40, 160, 100];
  } else if (promoType === 'birchall') {
    artistName = 'SAM BIRCHALL';
    releaseTitle = 'TWENTY MODERN RHYTHMIC LICKS';
    subHeader = 'CONTEMPORARY FUSION TECHNIQUES';
    bannerColor = [230, 50, 80];
  } else if (promoType === 'mantovanelli_jazz') {
    artistName = 'LUCA MANTOVANELLI';
    releaseTitle = '3 JAZZ STANDARD JAMS';
    subHeader = 'ADVANCED HARMONY & SOLOING';
    bannerColor = [185, 40, 40];
  }

  // Large Artist & Release Title Typography
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(240, 240, 245);
  doc.text(artistName, 25, 80);

  // Red accent badge
  doc.setFillColor(bannerColor[0], bannerColor[1], bannerColor[2]);
  doc.rect(25, 90, 160, 24, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text(releaseTitle, 30, 106);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(220, 225, 230);
  doc.text(subHeader, 25, 126);

  // Feature bullets box at bottom
  doc.setFillColor(10, 12, 15);
  doc.rect(0, 220, pageWidth, 77, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('INCLUDES', 22, 232);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(200, 205, 215);
  const bullets = [
    '> Full Masterclass PDF with diagrams & fretboard maps',
    '> Full TAB / Standard Notation & Detailed Lick Notes',
    '> Performance Video / Audio (Fast / Slow speeds)',
    '> Full Jamtrack & Backing Tracks in multiple keys',
    '> In-depth exercise breakdowns & concept explanations'
  ];
  bullets.forEach((b, idx) => {
    doc.text(b, 22, 240 + idx * 6);
  });

  // Call to action button
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(138, 245, 48, 12, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 15, 20);
  doc.text('AVAILABLE NOW >', 143, 252.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(180, 185, 195);
  doc.text('WWW.JAMTRACKCENTRAL.COM', 138, 270);
}

// ---------------------------------------------------------------------------
// HELPER: DRAW POWERTAB STYLE MUSIC NOTATION & TABLATURE SYSTEM
// ---------------------------------------------------------------------------
function drawPowerTabSystem(doc, {
  y,
  measures,
  sectionLabel,
  timeSignature,
  has8va = false,
  startMeasureNumber = 1
}) {
  const margin = 18;
  const contentWidth = 174;
  const standardStaffSpacing = 2.4;
  const standardStaffHeight = standardStaffSpacing * 4; // 5 lines
  const tabStaffSpacing = 3.1;
  const tabStaffHeight = tabStaffSpacing * 5; // 6 lines

  // Section Label (e.g. [A] Shape 1)
  if (sectionLabel) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 15, 20);
    doc.text(sectionLabel, margin, y - 4);
  }

  // 8va line if applicable
  if (has8va) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(80, 80, 90);
    doc.text('8va-------------------------------------------------------------------------------------------------', margin + 15, y - 1);
  }

  // 1. Draw 5-line Standard Notation Stave
  doc.setDrawColor(70, 75, 85);
  doc.setLineWidth(0.2);
  for (let i = 0; i < 5; i++) {
    const lineY = y + i * standardStaffSpacing;
    doc.line(margin, lineY, margin + contentWidth, lineY);
  }

  // Treble Clef glyph representation
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(30, 30, 35);
  doc.text('G', margin + 1.5, y + standardStaffHeight - 0.5);

  // Time signature on standard notation staff
  if (timeSignature) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 30, 35);
    const [num, den] = timeSignature.split('/');
    doc.text(num || '4', margin + 8, y + standardStaffSpacing * 1.6);
    doc.text(den || '4', margin + 8, y + standardStaffSpacing * 3.6);
  }

  // 2. Draw 6-line Tablature Stave
  const tabY = y + standardStaffHeight + 7;
  for (let i = 0; i < 6; i++) {
    const lineY = tabY + i * tabStaffSpacing;
    doc.line(margin, lineY, margin + contentWidth, lineY);
  }

  // TAB Letters on the left
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 30, 35);
  doc.text('T', margin + 2.5, tabY + tabStaffSpacing * 1.5);
  doc.text('A', margin + 2.5, tabY + tabStaffSpacing * 3.0);
  doc.text('B', margin + 2.5, tabY + tabStaffSpacing * 4.5);

  // Stave left & right border lines
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin, tabY + tabStaffHeight);
  doc.line(margin + contentWidth, y, margin + contentWidth, tabY + tabStaffHeight);

  // Measure barlines and notes
  const numMeasures = measures.length;
  const barWidth = (contentWidth - 14) / numMeasures;
  const startX = margin + 14;

  measures.forEach((m, mIdx) => {
    const measureX = startX + mIdx * barWidth;
    const measureNumber = startMeasureNumber + mIdx;

    // Measure number above standard stave
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(80, 85, 95);
    doc.text(String(measureNumber), measureX + 1, y - 1);

    // Measure barline
    if (mIdx > 0) {
      doc.setDrawColor(70, 75, 85);
      doc.setLineWidth(0.3);
      doc.line(measureX, y, measureX, tabY + tabStaffHeight);
    }

    // Measure notes
    const numNotes = m.notes.length;
    const noteStep = (barWidth - 4) / numNotes;

    // Triplet brackets if marked
    if (m.isTriplet) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(60, 60, 70);
      doc.text('3', measureX + barWidth * 0.45, y - 2);
      doc.setLineWidth(0.2);
      doc.line(measureX + 2, y - 2.5, measureX + barWidth - 2, y - 2.5);
    }

    m.notes.forEach((n, nIdx) => {
      const noteX = measureX + 2 + nIdx * noteStep;

      // Note stem on standard stave (stylized)
      const stemTopY = y + standardStaffHeight * 0.3;
      const stemBottomY = y + standardStaffHeight * 0.85;
      doc.setFillColor(30, 30, 35);
      doc.circle(noteX + 1, stemBottomY, 0.8, 'F');
      doc.setLineWidth(0.25);
      doc.line(noteX + 1.8, stemBottomY, noteX + 1.8, stemTopY);

      // Pick direction mark if any ('v' down, '^' up)
      if (n.pick) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6);
        doc.setTextColor(70, 75, 85);
        doc.text(n.pick, noteX, y - 0.5);
      }

      // Slide annotation ('sl.')
      if (n.slide) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(6);
        doc.setTextColor(70, 75, 85);
        doc.text('sl.', noteX - 1, tabY - 1);
      }

      // Hybrid picking ('H')
      if (n.hybrid) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(190, 40, 40);
        doc.text('H', noteX, tabY - 1);
      }

      // Tab fret number on string
      const stringY = tabY + (n.string - 1) * tabStaffSpacing;

      // White background cutout behind fret number
      doc.setFillColor(255, 255, 255);
      doc.rect(noteX - 1.2, stringY - 1.4, 4.2, 2.8, 'F');

      // Fret text
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(20, 20, 25);
      doc.text(String(n.fret), noteX - 0.5, stringY + 1);
    });
  });

  return tabY + tabStaffHeight + 14; // Return next Y position
}

// ---------------------------------------------------------------------------
// HELPER: DRAW PAGE HEADER AND FOOTER FOR NOTATION PAGES
// ---------------------------------------------------------------------------
function drawNotationPageHeader(doc, { title, pageNum, totalPages, albumInfo, tempoBpm = 90 }) {
  const margin = 18;
  const contentWidth = 174;

  if (pageNum === 1) {
    // Top Title Centered
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(15, 15, 20);
    doc.text(title.toUpperCase(), 105, 24, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(40, 45, 55);
    doc.text('As recorded by jamtrackcentral.com', 105, 30, { align: 'center' });

    doc.setFontSize(8);
    doc.setTextColor(70, 75, 85);
    doc.text(albumInfo, 105, 35, { align: 'center' });

    // Tempo mark
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(20, 20, 25);
    doc.text(`P = ${tempoBpm}`, margin, 44);
  } else {
    // Subsequent pages header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 30, 35);
    doc.text(`${title.toUpperCase()} - jamtrackcentral.com`, margin, 18);

    doc.setFont('helvetica', 'normal');
    doc.text(`Page ${pageNum} of ${totalPages}`, margin + contentWidth, 18, { align: 'right' });
  }

  // Footer on every notation page
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 105, 115);
  doc.text('JamTrackCentral Ltd 2016', 105, 283, { align: 'center' });
  doc.text('Generated using the Power Tab Editor by Brad Larsen. http://powertab.guitarnetwork.org', 105, 287, { align: 'center' });
}

// ===========================================================================
// 1. GENERATE LINKING SHAPES (3 PAGES)
// ===========================================================================
function generateLinkingShapesPdf() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Page 1: Cover
  drawCoverPage(doc, {
    title: 'Linking Shapes',
    masterclassLevel: 'BEGINNER',
    themeColor: [0, 180, 160] // Cyan / Teal
  });

  // Page 2: Promo
  drawPromoPage(doc, 'claudio');

  // Page 3: Music & Tablature (Exact 4 Systems from PowerTab)
  doc.addPage();
  drawNotationPageHeader(doc, {
    title: 'LINKING SHAPES',
    pageNum: 1,
    totalPages: 1,
    albumInfo: '(From the 2016 Album LUCA MANTOVANELLI PENTATONIC MASTERCLASS 1: BEGINNER)',
    tempoBpm: 90
  });

  let curY = 50;

  // System 1 (Bars 1-3)
  curY = drawPowerTabSystem(doc, {
    y: curY,
    startMeasureNumber: 1,
    sectionLabel: 'Shape 1                        Shape 2                        Shape 3',
    timeSignature: '3/4',
    measures: [
      {
        notes: [
          { string: 6, fret: 5, pick: 'v' }, { string: 6, fret: 8, pick: '^' },
          { string: 5, fret: 5, pick: 'v' }, { string: 5, fret: 7, pick: '^' },
          { string: 4, fret: 5, pick: 'v' }, { string: 4, fret: 7, pick: '^' },
          { string: 3, fret: 5, pick: 'v' }, { string: 3, fret: 7, pick: '^' },
          { string: 2, fret: 5, pick: 'v' }, { string: 2, fret: 8, pick: '^' },
          { string: 1, fret: 5, pick: 'v' }, { string: 1, fret: 8, pick: '^' }
        ]
      },
      {
        notes: [
          { string: 1, fret: 10, pick: 'v' }, { string: 1, fret: 8, pick: '^' },
          { string: 2, fret: 10, pick: 'v' }, { string: 2, fret: 8, pick: '^' },
          { string: 3, fret: 9, pick: 'v' }, { string: 3, fret: 7, pick: '^' },
          { string: 4, fret: 10, pick: 'v' }, { string: 4, fret: 7, pick: '^' },
          { string: 5, fret: 10, pick: 'v' }, { string: 5, fret: 7, pick: '^' },
          { string: 6, fret: 10, pick: 'v' }, { string: 6, fret: 8, pick: '^' }
        ]
      },
      {
        notes: [
          { string: 6, fret: 10, pick: 'v' }, { string: 6, fret: 12, pick: '^' },
          { string: 5, fret: 10, pick: 'v' }, { string: 5, fret: 12, pick: '^' },
          { string: 4, fret: 10, pick: 'v' }, { string: 4, fret: 12, pick: '^' },
          { string: 3, fret: 9, pick: 'v' }, { string: 3, fret: 12, pick: '^' },
          { string: 2, fret: 10, pick: 'v' }, { string: 2, fret: 13, pick: '^' },
          { string: 1, fret: 10, pick: 'v' }, { string: 1, fret: 12, pick: '^' }
        ]
      }
    ]
  });

  // System 2 (Bars 4-6)
  curY = drawPowerTabSystem(doc, {
    y: curY + 2,
    startMeasureNumber: 4,
    sectionLabel: 'Shape 4                        Shape 5                        Shape 1 (octave)',
    has8va: true,
    measures: [
      {
        notes: [
          { string: 1, fret: 15 }, { string: 1, fret: 12 }, { string: 2, fret: 15 }, { string: 2, fret: 13 },
          { string: 3, fret: 14 }, { string: 3, fret: 12 }, { string: 4, fret: 14 }, { string: 4, fret: 12 },
          { string: 5, fret: 15 }, { string: 5, fret: 12 }, { string: 6, fret: 15 }, { string: 6, fret: 12 }
        ]
      },
      {
        notes: [
          { string: 6, fret: 15 }, { string: 6, fret: 17 }, { string: 5, fret: 15 }, { string: 5, fret: 17 },
          { string: 4, fret: 14 }, { string: 4, fret: 17 }, { string: 3, fret: 14 }, { string: 3, fret: 17 },
          { string: 2, fret: 15 }, { string: 2, fret: 17 }, { string: 1, fret: 15 }, { string: 1, fret: 17 }
        ]
      },
      {
        notes: [
          { string: 1, fret: 20 }, { string: 1, fret: 17 }, { string: 2, fret: 20 }, { string: 2, fret: 17 },
          { string: 3, fret: 19 }, { string: 3, fret: 17 }, { string: 4, fret: 19 }, { string: 4, fret: 17 },
          { string: 5, fret: 19 }, { string: 5, fret: 17 }, { string: 6, fret: 20 }, { string: 6, fret: 17 }
        ]
      }
    ]
  });

  // System 3 (Bars 7-9)
  curY = drawPowerTabSystem(doc, {
    y: curY + 2,
    startMeasureNumber: 7,
    sectionLabel: 'Shape 1 (octave)               Shape 5                        Shape 4',
    has8va: true,
    measures: [
      {
        notes: [
          { string: 6, fret: 17 }, { string: 6, fret: 20 }, { string: 5, fret: 17 }, { string: 5, fret: 19 },
          { string: 4, fret: 17 }, { string: 4, fret: 19 }, { string: 3, fret: 17 }, { string: 3, fret: 19 },
          { string: 2, fret: 17 }, { string: 2, fret: 20 }, { string: 1, fret: 17 }, { string: 1, fret: 20 }
        ]
      },
      {
        notes: [
          { string: 1, fret: 17 }, { string: 1, fret: 15 }, { string: 2, fret: 17 }, { string: 2, fret: 15 },
          { string: 3, fret: 17 }, { string: 3, fret: 14 }, { string: 4, fret: 17 }, { string: 4, fret: 14 },
          { string: 5, fret: 17 }, { string: 5, fret: 15 }, { string: 6, fret: 17 }, { string: 6, fret: 15 }
        ]
      },
      {
        notes: [
          { string: 6, fret: 12 }, { string: 6, fret: 15 }, { string: 5, fret: 12 }, { string: 5, fret: 15 },
          { string: 4, fret: 12 }, { string: 4, fret: 14 }, { string: 3, fret: 12 }, { string: 3, fret: 14 },
          { string: 2, fret: 13 }, { string: 2, fret: 15 }, { string: 1, fret: 12 }, { string: 1, fret: 15 }
        ]
      }
    ]
  });

  // System 4 (Bars 10-12)
  drawPowerTabSystem(doc, {
    y: curY + 2,
    startMeasureNumber: 10,
    sectionLabel: 'Shape 3                        Shape 2                        Shape 1',
    measures: [
      {
        notes: [
          { string: 1, fret: 12 }, { string: 1, fret: 10 }, { string: 2, fret: 13 }, { string: 2, fret: 10 },
          { string: 3, fret: 12 }, { string: 3, fret: 9 }, { string: 4, fret: 12 }, { string: 4, fret: 10 },
          { string: 5, fret: 12 }, { string: 5, fret: 10 }, { string: 6, fret: 12 }, { string: 6, fret: 10 }
        ]
      },
      {
        notes: [
          { string: 6, fret: 8 }, { string: 6, fret: 10 }, { string: 5, fret: 8 }, { string: 5, fret: 10 },
          { string: 4, fret: 7 }, { string: 4, fret: 10 }, { string: 3, fret: 7 }, { string: 3, fret: 9 },
          { string: 2, fret: 8 }, { string: 2, fret: 10 }, { string: 1, fret: 8 }, { string: 1, fret: 10 }
        ]
      },
      {
        notes: [
          { string: 1, fret: 8 }, { string: 1, fret: 5 }, { string: 2, fret: 8 }, { string: 2, fret: 5 },
          { string: 3, fret: 7 }, { string: 3, fret: 5 }, { string: 4, fret: 7 }, { string: 4, fret: 5 },
          { string: 5, fret: 7 }, { string: 5, fret: 5 }, { string: 6, fret: 8 }, { string: 6, fret: 5 }
        ]
      }
    ]
  });

  const destPath = path.join(PDF_DIR, 'linking-shapes.pdf');
  fs.writeFileSync(destPath, Buffer.from(doc.output('arraybuffer')));
  console.log('Successfully generated:', destPath);
}

// ===========================================================================
// 2. GENERATE VARIATION 01 (6 PAGES)
// ===========================================================================
function generateVariation01Pdf() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Page 1: Cover
  drawCoverPage(doc, {
    title: 'Variation 01',
    masterclassLevel: 'BEGINNER',
    themeColor: [0, 180, 160]
  });

  // Page 2: Promo
  drawPromoPage(doc, 'claudio');

  // Page 3: Notation Page 1 of 4
  doc.addPage();
  drawNotationPageHeader(doc, {
    title: 'VARIATION 1',
    pageNum: 1,
    totalPages: 4,
    albumInfo: '(From the 2016 Album LUCA MANTOVANELLI PENTATONIC MASTERCLASS 1: BEGINNER)',
    tempoBpm: 90
  });

  let curY = 50;
  // System 1 (Bars 1-2: Shape 1)
  curY = drawPowerTabSystem(doc, {
    y: curY,
    startMeasureNumber: 1,
    sectionLabel: '[A] Shape 1',
    timeSignature: '3/4',
    measures: [
      {
        notes: [
          { string: 6, fret: 5 }, { string: 6, fret: 8 }, { string: 6, fret: 5 },
          { string: 5, fret: 7 }, { string: 5, fret: 5 }, { string: 5, fret: 7 },
          { string: 5, fret: 5 }, { string: 5, fret: 7 }, { string: 5, fret: 5 },
          { string: 4, fret: 7 }, { string: 4, fret: 5 }, { string: 4, fret: 7 }
        ]
      },
      {
        notes: [
          { string: 4, fret: 5 }, { string: 4, fret: 7 }, { string: 4, fret: 5 },
          { string: 3, fret: 7 }, { string: 3, fret: 5 }, { string: 3, fret: 7 },
          { string: 2, fret: 5 }, { string: 2, fret: 8 }, { string: 2, fret: 5 },
          { string: 1, fret: 7 }, { string: 1, fret: 5 }, { string: 1, fret: 8 }
        ]
      }
    ]
  });

  // System 2 (Bars 3-4: Shape 1 discesa)
  curY = drawPowerTabSystem(doc, {
    y: curY + 2,
    startMeasureNumber: 3,
    measures: [
      {
        notes: [
          { string: 1, fret: 8 }, { string: 1, fret: 5 }, { string: 2, fret: 8 },
          { string: 2, fret: 5 }, { string: 2, fret: 7 }, { string: 3, fret: 5 },
          { string: 3, fret: 8 }, { string: 3, fret: 5 }, { string: 4, fret: 7 },
          { string: 4, fret: 5 }, { string: 4, fret: 7 }, { string: 5, fret: 5 }
        ]
      },
      {
        notes: [
          { string: 5, fret: 7 }, { string: 5, fret: 5 }, { string: 6, fret: 7 },
          { string: 6, fret: 5 }, { string: 6, fret: 7 }, { string: 6, fret: 5 },
          { string: 6, fret: 7 }, { string: 6, fret: 5 }, { string: 6, fret: 8 },
          { string: 6, fret: 5 }, { string: 6, fret: 5 }, { string: 6, fret: 5 }
        ]
      }
    ]
  });

  // System 3 (Bars 5-6: Shape 2)
  curY = drawPowerTabSystem(doc, {
    y: curY + 2,
    startMeasureNumber: 5,
    sectionLabel: '[B] Shape 2',
    measures: [
      {
        notes: [
          { string: 6, fret: 8 }, { string: 6, fret: 10 }, { string: 5, fret: 7 },
          { string: 5, fret: 10 }, { string: 5, fret: 7 }, { string: 5, fret: 10 },
          { string: 4, fret: 7 }, { string: 4, fret: 10 }, { string: 4, fret: 7 },
          { string: 3, fret: 10 }, { string: 3, fret: 7 }, { string: 3, fret: 9 }
        ]
      },
      {
        notes: [
          { string: 3, fret: 7 }, { string: 3, fret: 10 }, { string: 2, fret: 7 },
          { string: 2, fret: 9 }, { string: 2, fret: 8 }, { string: 2, fret: 10 },
          { string: 1, fret: 7 }, { string: 1, fret: 9 }, { string: 1, fret: 8 },
          { string: 1, fret: 10 }, { string: 1, fret: 8 }, { string: 1, fret: 10 }
        ]
      }
    ]
  });

  // Page 4: Notation Page 2 of 4
  doc.addPage();
  drawNotationPageHeader(doc, {
    title: 'VARIATION 1',
    pageNum: 2,
    totalPages: 4,
    albumInfo: ''
  });

  curY = 32;
  // System 4 (Bars 11-12)
  curY = drawPowerTabSystem(doc, {
    y: curY,
    startMeasureNumber: 11,
    sectionLabel: '[D] Shape 4',
    measures: [
      {
        notes: [
          { string: 1, fret: 12 }, { string: 1, fret: 10 }, { string: 2, fret: 13 },
          { string: 2, fret: 10 }, { string: 3, fret: 12 }, { string: 3, fret: 9 },
          { string: 4, fret: 13 }, { string: 4, fret: 10 }, { string: 4, fret: 12 },
          { string: 5, fret: 9 }, { string: 5, fret: 12 }, { string: 6, fret: 10 }
        ]
      },
      {
        notes: [
          { string: 6, fret: 12 }, { string: 6, fret: 9 }, { string: 6, fret: 12 },
          { string: 6, fret: 10 }, { string: 6, fret: 12 }, { string: 6, fret: 10 },
          { string: 6, fret: 12 }, { string: 6, fret: 10 }, { string: 6, fret: 12 },
          { string: 6, fret: 10 }, { string: 6, fret: 12 }, { string: 6, fret: 10 }
        ]
      }
    ]
  });

  // System 5 (Bars 17-18)
  curY = drawPowerTabSystem(doc, {
    y: curY + 4,
    startMeasureNumber: 17,
    sectionLabel: '[E] Shape 5',
    has8va: true,
    measures: [
      {
        notes: [
          { string: 6, fret: 15 }, { string: 6, fret: 17 }, { string: 5, fret: 15 },
          { string: 5, fret: 17 }, { string: 4, fret: 14 }, { string: 4, fret: 17 },
          { string: 3, fret: 15 }, { string: 3, fret: 17 }, { string: 2, fret: 14 },
          { string: 2, fret: 17 }, { string: 1, fret: 14 }, { string: 1, fret: 17 }
        ]
      },
      {
        notes: [
          { string: 1, fret: 14 }, { string: 1, fret: 17 }, { string: 2, fret: 14 },
          { string: 2, fret: 17 }, { string: 3, fret: 15 }, { string: 3, fret: 17 },
          { string: 4, fret: 14 }, { string: 4, fret: 17 }, { string: 5, fret: 15 },
          { string: 5, fret: 17 }, { string: 6, fret: 15 }, { string: 6, fret: 17 }
        ]
      }
    ]
  });

  // System 6 (Bars 21-22: Shape 1 triplets)
  drawPowerTabSystem(doc, {
    y: curY + 4,
    startMeasureNumber: 21,
    sectionLabel: '[F] Shape 1 - triplets',
    measures: [
      {
        isTriplet: true,
        notes: [
          { string: 6, fret: 5 }, { string: 6, fret: 8 }, { string: 5, fret: 5 },
          { string: 5, fret: 7 }, { string: 5, fret: 5 }, { string: 4, fret: 7 },
          { string: 4, fret: 5 }, { string: 4, fret: 7 }, { string: 3, fret: 5 },
          { string: 3, fret: 7 }, { string: 3, fret: 5 }, { string: 2, fret: 7 }
        ]
      },
      {
        isTriplet: true,
        notes: [
          { string: 2, fret: 5 }, { string: 2, fret: 7 }, { string: 1, fret: 5 },
          { string: 1, fret: 7 }, { string: 1, fret: 5 }, { string: 1, fret: 8 },
          { string: 1, fret: 5 }, { string: 1, fret: 7 }, { string: 1, fret: 5 },
          { string: 1, fret: 8 }, { string: 1, fret: 5 }, { string: 1, fret: 8 }
        ]
      }
    ]
  });

  // Page 5: Notation Page 3 of 4
  doc.addPage();
  drawNotationPageHeader(doc, {
    title: 'VARIATION 1',
    pageNum: 3,
    totalPages: 4,
    albumInfo: ''
  });

  curY = 32;
  // System 7 (Shape 2 triplets)
  curY = drawPowerTabSystem(doc, {
    y: curY,
    startMeasureNumber: 25,
    sectionLabel: '[G] Shape 2 - triplets',
    measures: [
      {
        isTriplet: true,
        notes: [
          { string: 6, fret: 8 }, { string: 6, fret: 10 }, { string: 5, fret: 7 },
          { string: 5, fret: 10 }, { string: 5, fret: 7 }, { string: 4, fret: 10 },
          { string: 4, fret: 7 }, { string: 4, fret: 10 }, { string: 3, fret: 7 },
          { string: 3, fret: 10 }, { string: 3, fret: 7 }, { string: 2, fret: 9 }
        ]
      },
      {
        isTriplet: true,
        notes: [
          { string: 2, fret: 7 }, { string: 2, fret: 10 }, { string: 1, fret: 7 },
          { string: 1, fret: 9 }, { string: 1, fret: 8 }, { string: 1, fret: 10 },
          { string: 1, fret: 7 }, { string: 1, fret: 9 }, { string: 1, fret: 8 },
          { string: 1, fret: 10 }, { string: 1, fret: 8 }, { string: 1, fret: 10 }
        ]
      }
    ]
  });

  // System 8 (Shape 3 triplets)
  curY = drawPowerTabSystem(doc, {
    y: curY + 4,
    startMeasureNumber: 29,
    sectionLabel: '[H] Shape 3 - triplets',
    measures: [
      {
        isTriplet: true,
        notes: [
          { string: 6, fret: 10 }, { string: 6, fret: 12 }, { string: 5, fret: 10 },
          { string: 5, fret: 12 }, { string: 5, fret: 10 }, { string: 4, fret: 12 },
          { string: 4, fret: 10 }, { string: 4, fret: 12 }, { string: 3, fret: 10 },
          { string: 3, fret: 12 }, { string: 3, fret: 9 }, { string: 2, fret: 12 }
        ]
      },
      {
        isTriplet: true,
        notes: [
          { string: 2, fret: 10 }, { string: 2, fret: 12 }, { string: 1, fret: 9 },
          { string: 1, fret: 12 }, { string: 1, fret: 10 }, { string: 1, fret: 13 },
          { string: 1, fret: 9 }, { string: 1, fret: 12 }, { string: 1, fret: 10 },
          { string: 1, fret: 13 }, { string: 1, fret: 10 }, { string: 1, fret: 12 }
        ]
      }
    ]
  });

  // System 9 (Shape 4 triplets)
  drawPowerTabSystem(doc, {
    y: curY + 4,
    startMeasureNumber: 33,
    sectionLabel: '[I] Shape 4 - triplets',
    has8va: true,
    measures: [
      {
        isTriplet: true,
        notes: [
          { string: 6, fret: 12 }, { string: 6, fret: 15 }, { string: 5, fret: 12 },
          { string: 5, fret: 15 }, { string: 5, fret: 12 }, { string: 4, fret: 14 },
          { string: 4, fret: 12 }, { string: 4, fret: 15 }, { string: 3, fret: 12 },
          { string: 3, fret: 14 }, { string: 3, fret: 12 }, { string: 2, fret: 14 }
        ]
      },
      {
        isTriplet: true,
        notes: [
          { string: 2, fret: 12 }, { string: 2, fret: 14 }, { string: 1, fret: 12 },
          { string: 1, fret: 14 }, { string: 1, fret: 13 }, { string: 1, fret: 15 },
          { string: 1, fret: 12 }, { string: 1, fret: 14 }, { string: 1, fret: 13 },
          { string: 1, fret: 15 }, { string: 1, fret: 12 }, { string: 1, fret: 15 }
        ]
      }
    ]
  });

  // Page 6: Notation Page 4 of 4
  doc.addPage();
  drawNotationPageHeader(doc, {
    title: 'VARIATION 1',
    pageNum: 4,
    totalPages: 4,
    albumInfo: ''
  });

  curY = 32;
  // System 10 (Shape 5 triplets)
  drawPowerTabSystem(doc, {
    y: curY,
    startMeasureNumber: 37,
    sectionLabel: '[J] Shape 5 - triplets',
    has8va: true,
    measures: [
      {
        isTriplet: true,
        notes: [
          { string: 6, fret: 15 }, { string: 6, fret: 17 }, { string: 5, fret: 15 },
          { string: 5, fret: 17 }, { string: 5, fret: 14 }, { string: 4, fret: 17 },
          { string: 4, fret: 15 }, { string: 4, fret: 17 }, { string: 3, fret: 14 },
          { string: 3, fret: 17 }, { string: 3, fret: 14 }, { string: 2, fret: 17 }
        ]
      },
      {
        isTriplet: true,
        notes: [
          { string: 2, fret: 14 }, { string: 2, fret: 17 }, { string: 1, fret: 14 },
          { string: 1, fret: 17 }, { string: 1, fret: 15 }, { string: 1, fret: 17 },
          { string: 1, fret: 14 }, { string: 1, fret: 17 }, { string: 1, fret: 15 },
          { string: 1, fret: 17 }, { string: 1, fret: 15 }, { string: 1, fret: 17 }
        ]
      }
    ]
  });

  const destPath = path.join(PDF_DIR, 'variation-01-triplets.pdf');
  fs.writeFileSync(destPath, Buffer.from(doc.output('arraybuffer')));
  console.log('Successfully generated:', destPath);
}

// ===========================================================================
// 3. GENERATE VARIATION 02 (6 PAGES)
// ===========================================================================
function generateVariation02Pdf() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Page 1: Cover
  drawCoverPage(doc, {
    title: 'Variation 02',
    masterclassLevel: 'BEGINNER',
    themeColor: [0, 180, 160]
  });

  // Page 2: Promo Marco Sfogli
  drawPromoPage(doc, 'sfogli');

  // Page 3: Notation Page 1 of 4
  doc.addPage();
  drawNotationPageHeader(doc, {
    title: 'VARIATION 2',
    pageNum: 1,
    totalPages: 4,
    albumInfo: '(From the 2016 Album LUCA MANTOVANELLI PENTATONIC MASTERCLASS 1: BEGINNER)',
    tempoBpm: 90
  });

  let curY = 50;
  // System 1 (Bars 1-2: Doubling Shape 1)
  curY = drawPowerTabSystem(doc, {
    y: curY,
    startMeasureNumber: 1,
    sectionLabel: '[A] Shape 1',
    timeSignature: '4/4',
    measures: [
      {
        notes: [
          { string: 1, fret: 8 }, { string: 1, fret: 5 }, { string: 1, fret: 8 }, { string: 1, fret: 5 },
          { string: 1, fret: 8 }, { string: 1, fret: 5 }, { string: 2, fret: 7 }, { string: 2, fret: 5 },
          { string: 2, fret: 7 }, { string: 2, fret: 5 }, { string: 2, fret: 7 }, { string: 2, fret: 5 },
          { string: 3, fret: 7 }, { string: 3, fret: 5 }, { string: 3, fret: 7 }, { string: 3, fret: 5 }
        ]
      },
      {
        notes: [
          { string: 4, fret: 7 }, { string: 4, fret: 5 }, { string: 4, fret: 7 }, { string: 4, fret: 5 },
          { string: 5, fret: 7 }, { string: 5, fret: 5 }, { string: 5, fret: 7 }, { string: 5, fret: 5 },
          { string: 6, fret: 8 }, { string: 6, fret: 5 }, { string: 6, fret: 8 }, { string: 6, fret: 5 },
          { string: 6, fret: 8 }, { string: 6, fret: 5 }, { string: 6, fret: 8 }, { string: 6, fret: 5 }
        ]
      }
    ]
  });

  // System 2 (Bars 5-6: Doubling Shape 2)
  curY = drawPowerTabSystem(doc, {
    y: curY + 4,
    startMeasureNumber: 5,
    sectionLabel: '[B] Shape 2',
    measures: [
      {
        notes: [
          { string: 1, fret: 10 }, { string: 1, fret: 8 }, { string: 1, fret: 10 }, { string: 1, fret: 7 },
          { string: 2, fret: 10 }, { string: 2, fret: 7 }, { string: 2, fret: 10 }, { string: 2, fret: 7 },
          { string: 3, fret: 9 }, { string: 3, fret: 7 }, { string: 3, fret: 9 }, { string: 3, fret: 8 },
          { string: 4, fret: 10 }, { string: 4, fret: 8 }, { string: 4, fret: 10 }, { string: 4, fret: 8 }
        ]
      },
      {
        notes: [
          { string: 5, fret: 10 }, { string: 5, fret: 7 }, { string: 5, fret: 10 }, { string: 5, fret: 7 },
          { string: 6, fret: 10 }, { string: 6, fret: 8 }, { string: 6, fret: 10 }, { string: 6, fret: 8 },
          { string: 6, fret: 10 }, { string: 6, fret: 8 }, { string: 6, fret: 10 }, { string: 6, fret: 8 }
        ]
      }
    ]
  });

  // Page 4: Notation Page 2 of 4
  doc.addPage();
  drawNotationPageHeader(doc, {
    title: 'VARIATION 2',
    pageNum: 2,
    totalPages: 4,
    albumInfo: ''
  });

  curY = 32;
  // System 3 (Bars 13-14: Shape 4)
  curY = drawPowerTabSystem(doc, {
    y: curY,
    startMeasureNumber: 13,
    sectionLabel: '[D] Shape 4',
    has8va: true,
    measures: [
      {
        notes: [
          { string: 1, fret: 15 }, { string: 1, fret: 12 }, { string: 1, fret: 15 }, { string: 1, fret: 12 },
          { string: 2, fret: 15 }, { string: 2, fret: 13 }, { string: 2, fret: 15 }, { string: 2, fret: 13 },
          { string: 3, fret: 14 }, { string: 3, fret: 12 }, { string: 3, fret: 14 }, { string: 3, fret: 12 },
          { string: 4, fret: 14 }, { string: 4, fret: 12 }, { string: 4, fret: 14 }, { string: 4, fret: 12 }
        ]
      },
      {
        notes: [
          { string: 5, fret: 15 }, { string: 5, fret: 12 }, { string: 5, fret: 15 }, { string: 5, fret: 12 },
          { string: 6, fret: 15 }, { string: 6, fret: 12 }, { string: 6, fret: 15 }, { string: 6, fret: 12 },
          { string: 6, fret: 15 }, { string: 6, fret: 12 }, { string: 6, fret: 15 }, { string: 6, fret: 12 }
        ]
      }
    ]
  });

  // Page 5: Notation Page 3 of 4
  doc.addPage();
  drawNotationPageHeader(doc, {
    title: 'VARIATION 2',
    pageNum: 3,
    totalPages: 4,
    albumInfo: ''
  });

  curY = 32;
  // System 4 (Triplet Doubling)
  drawPowerTabSystem(doc, {
    y: curY,
    startMeasureNumber: 27,
    sectionLabel: '[G] Shape 2 - triplets',
    measures: [
      {
        isTriplet: true,
        notes: [
          { string: 1, fret: 10 }, { string: 1, fret: 8 }, { string: 1, fret: 10 },
          { string: 2, fret: 7 }, { string: 2, fret: 10 }, { string: 2, fret: 7 },
          { string: 3, fret: 10 }, { string: 3, fret: 7 }, { string: 3, fret: 10 },
          { string: 4, fret: 7 }, { string: 4, fret: 10 }, { string: 4, fret: 7 }
        ]
      },
      {
        isTriplet: true,
        notes: [
          { string: 5, fret: 10 }, { string: 5, fret: 7 }, { string: 5, fret: 10 },
          { string: 6, fret: 7 }, { string: 6, fret: 10 }, { string: 6, fret: 7 },
          { string: 6, fret: 9 }, { string: 6, fret: 7 }, { string: 6, fret: 9 }
        ]
      }
    ]
  });

  // Page 6: Notation Page 4 of 4
  doc.addPage();
  drawNotationPageHeader(doc, {
    title: 'VARIATION 2',
    pageNum: 4,
    totalPages: 4,
    albumInfo: ''
  });

  curY = 32;
  // System 5 (Shape 5 Triplet Doubling)
  drawPowerTabSystem(doc, {
    y: curY,
    startMeasureNumber: 45,
    sectionLabel: '[J] Shape 5 - triplets',
    has8va: true,
    measures: [
      {
        isTriplet: true,
        notes: [
          { string: 1, fret: 17 }, { string: 1, fret: 15 }, { string: 1, fret: 17 },
          { string: 2, fret: 15 }, { string: 2, fret: 17 }, { string: 2, fret: 15 },
          { string: 3, fret: 17 }, { string: 3, fret: 15 }, { string: 3, fret: 17 },
          { string: 4, fret: 14 }, { string: 4, fret: 17 }, { string: 4, fret: 14 }
        ]
      },
      {
        isTriplet: true,
        notes: [
          { string: 5, fret: 17 }, { string: 5, fret: 14 }, { string: 5, fret: 17 },
          { string: 6, fret: 14 }, { string: 6, fret: 17 }, { string: 6, fret: 14 },
          { string: 6, fret: 17 }, { string: 6, fret: 14 }, { string: 6, fret: 17 }
        ]
      }
    ]
  });

  const destPath = path.join(PDF_DIR, 'variation-02-doubling-notes.pdf');
  fs.writeFileSync(destPath, Buffer.from(doc.output('arraybuffer')));
  console.log('Successfully generated:', destPath);
}

// ===========================================================================
// 4. GENERATE ARPEGGIO 01 TRIPLETS (3 PAGES)
// ===========================================================================
function generateArpeggio01Pdf() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Page 1: Cover
  drawCoverPage(doc, {
    title: 'Arpeggio 01 Triplets',
    masterclassLevel: 'INTERMEDIATE',
    themeColor: [230, 180, 20] // Gold / Amber
  });

  // Page 2: Promo Sam Birchall
  drawPromoPage(doc, 'birchall');

  // Page 3: Notation Page 1 of 1 (Exact 5 Shapes Arpeggio 1 Triplets)
  doc.addPage();
  drawNotationPageHeader(doc, {
    title: 'ARPEGGIO 1 TRIPLETS',
    pageNum: 1,
    totalPages: 1,
    albumInfo: '(From the 2016 Album LUCA MANTOVANELLI PENTATONIC MASTERCLASS 2: INTERMEDIATE)',
    tempoBpm: 90
  });

  let curY = 50;

  // System 1: [A] Shape 5
  curY = drawPowerTabSystem(doc, {
    y: curY,
    startMeasureNumber: 1,
    sectionLabel: '[A] Shape 5',
    timeSignature: '4/4',
    measures: [
      {
        isTriplet: true,
        notes: [
          { string: 6, fret: 5 }, { string: 5, fret: 3 }, { string: 4, fret: 2 },
          { string: 5, fret: 5 }, { string: 4, fret: 2 }, { string: 3, fret: 2 },
          { string: 4, fret: 5 }, { string: 3, fret: 2 }, { string: 2, fret: 3 },
          { string: 3, fret: 5 }, { string: 2, fret: 3 }, { string: 1, fret: 3 }
        ]
      },
      {
        isTriplet: true,
        notes: [
          { string: 1, fret: 3 }, { string: 2, fret: 5 }, { string: 3, fret: 3 },
          { string: 2, fret: 3 }, { string: 3, fret: 5 }, { string: 4, fret: 2 },
          { string: 3, fret: 3 }, { string: 4, fret: 5 }, { string: 5, fret: 2 },
          { string: 4, fret: 2 }, { string: 5, fret: 5 }, { string: 6, fret: 3 },
          { string: 6, fret: 2 }
        ]
      }
    ]
  });

  // System 2: [B] Shape 1
  curY = drawPowerTabSystem(doc, {
    y: curY + 2,
    startMeasureNumber: 3,
    sectionLabel: '[B] Shape 1',
    measures: [
      {
        isTriplet: true,
        notes: [
          { string: 6, fret: 8 }, { string: 5, fret: 5 }, { string: 4, fret: 5 },
          { string: 5, fret: 7 }, { string: 4, fret: 5 }, { string: 3, fret: 5 },
          { string: 4, fret: 7 }, { string: 3, fret: 5 }, { string: 2, fret: 5 },
          { string: 3, fret: 7 }, { string: 2, fret: 5 }, { string: 1, fret: 5 }
        ]
      },
      {
        isTriplet: true,
        notes: [
          { string: 1, fret: 5 }, { string: 2, fret: 7 }, { string: 3, fret: 5 },
          { string: 2, fret: 5 }, { string: 3, fret: 7 }, { string: 4, fret: 5 },
          { string: 3, fret: 5 }, { string: 4, fret: 7 }, { string: 5, fret: 5 },
          { string: 4, fret: 5 }, { string: 5, fret: 7 }, { string: 6, fret: 5 },
          { string: 6, fret: 8 }
        ]
      }
    ]
  });

  // System 3: [C] Shape 2
  curY = drawPowerTabSystem(doc, {
    y: curY + 2,
    startMeasureNumber: 5,
    sectionLabel: '[C] Shape 2',
    measures: [
      {
        isTriplet: true,
        notes: [
          { string: 6, fret: 10 }, { string: 5, fret: 7 }, { string: 4, fret: 7 },
          { string: 5, fret: 10 }, { string: 4, fret: 7 }, { string: 3, fret: 7 },
          { string: 4, fret: 10 }, { string: 3, fret: 7 }, { string: 2, fret: 8 },
          { string: 3, fret: 9 }, { string: 2, fret: 8 }, { string: 1, fret: 8 }
        ]
      },
      {
        isTriplet: true,
        notes: [
          { string: 1, fret: 8 }, { string: 2, fret: 9 }, { string: 3, fret: 8 },
          { string: 2, fret: 8 }, { string: 3, fret: 10 }, { string: 4, fret: 7 },
          { string: 3, fret: 8 }, { string: 4, fret: 10 }, { string: 5, fret: 7 },
          { string: 4, fret: 7 }, { string: 5, fret: 10 }, { string: 6, fret: 7 },
          { string: 6, fret: 10 }
        ]
      }
    ]
  });

  // System 4: [D] Shape 3 & [E] Shape 4
  drawPowerTabSystem(doc, {
    y: curY + 2,
    startMeasureNumber: 7,
    sectionLabel: '[D] Shape 3                                            [E] Shape 4',
    measures: [
      {
        isTriplet: true,
        notes: [
          { string: 6, fret: 12 }, { string: 5, fret: 10 }, { string: 4, fret: 10 },
          { string: 5, fret: 12 }, { string: 4, fret: 10 }, { string: 3, fret: 9 },
          { string: 4, fret: 12 }, { string: 3, fret: 9 }, { string: 2, fret: 10 },
          { string: 3, fret: 12 }, { string: 2, fret: 10 }, { string: 1, fret: 10 }
        ]
      },
      {
        isTriplet: true,
        notes: [
          { string: 6, fret: 15 }, { string: 5, fret: 12 }, { string: 4, fret: 12 },
          { string: 5, fret: 15 }, { string: 4, fret: 12 }, { string: 3, fret: 12 },
          { string: 4, fret: 14 }, { string: 3, fret: 12 }, { string: 2, fret: 13 },
          { string: 3, fret: 14 }, { string: 2, fret: 13 }, { string: 1, fret: 12 }
        ]
      }
    ]
  });

  const destPath = path.join(PDF_DIR, 'arpeggio-01-adjacent-strings.pdf');
  fs.writeFileSync(destPath, Buffer.from(doc.output('arraybuffer')));
  console.log('Successfully generated:', destPath);
}

// ===========================================================================
// 5. GENERATE HYBRID PENTATONICS (8 PAGES)
// ===========================================================================
function generateHybridPentatonicsPdf() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Page 1: Cover
  drawCoverPage(doc, {
    title: 'Hybrid Pentatonics',
    masterclassLevel: 'INTERMEDIATE',
    themeColor: [230, 180, 20]
  });

  // Page 2: Promo Sam Birchall
  drawPromoPage(doc, 'birchall');

  // Page 3: Notation Page 1 of 6
  doc.addPage();
  drawNotationPageHeader(doc, {
    title: 'HYBRID PENTATONICS',
    pageNum: 1,
    totalPages: 6,
    albumInfo: '(From the 2016 Album LUCA MANTOVANELLI PENTATONIC MASTERCLASS 2: INTERMEDIATE)',
    tempoBpm: 70
  });

  let curY = 50;
  // System 1: [A] Shape 1 with Hybrid "H" markings
  curY = drawPowerTabSystem(doc, {
    y: curY,
    startMeasureNumber: 1,
    sectionLabel: '[A] Shape 1',
    timeSignature: '4/4',
    measures: [
      {
        notes: [
          { string: 6, fret: 5, hybrid: true }, { string: 5, fret: 8 }, { string: 4, fret: 7 },
          { string: 6, fret: 5, hybrid: true }, { string: 5, fret: 8 }, { string: 4, fret: 7 },
          { string: 5, fret: 5, hybrid: true }, { string: 4, fret: 7 }, { string: 3, fret: 7 },
          { string: 5, fret: 5, hybrid: true }, { string: 4, fret: 7 }, { string: 3, fret: 7 },
          { string: 4, fret: 5, hybrid: true }, { string: 3, fret: 7 }, { string: 2, fret: 8 },
          { string: 4, fret: 5, hybrid: true }
        ]
      }
    ]
  });

  // System 2: [B] Shape 2
  curY = drawPowerTabSystem(doc, {
    y: curY + 4,
    startMeasureNumber: 4,
    sectionLabel: '[B] Shape 2',
    measures: [
      {
        notes: [
          { string: 6, fret: 8, hybrid: true }, { string: 5, fret: 10 }, { string: 4, fret: 10 },
          { string: 6, fret: 8, hybrid: true }, { string: 5, fret: 10 }, { string: 4, fret: 10 },
          { string: 5, fret: 7, hybrid: true }, { string: 4, fret: 10 }, { string: 3, fret: 9 },
          { string: 5, fret: 7, hybrid: true }, { string: 4, fret: 10 }, { string: 3, fret: 9 },
          { string: 4, fret: 7, hybrid: true }, { string: 3, fret: 10 }, { string: 2, fret: 10 },
          { string: 4, fret: 7, hybrid: true }
        ]
      }
    ]
  });

  // System 3: [C] Shape 3
  drawPowerTabSystem(doc, {
    y: curY + 4,
    startMeasureNumber: 7,
    sectionLabel: '[C] Shape 3',
    measures: [
      {
        notes: [
          { string: 6, fret: 10, hybrid: true }, { string: 5, fret: 12 }, { string: 4, fret: 12 },
          { string: 6, fret: 10, hybrid: true }, { string: 5, fret: 12 }, { string: 4, fret: 12 },
          { string: 5, fret: 10, hybrid: true }, { string: 4, fret: 12 }, { string: 3, fret: 12 },
          { string: 5, fret: 10, hybrid: true }, { string: 4, fret: 12 }, { string: 3, fret: 12 },
          { string: 4, fret: 10, hybrid: true }, { string: 3, fret: 12 }, { string: 2, fret: 13 },
          { string: 4, fret: 10, hybrid: true }
        ]
      }
    ]
  });

  // Pages 4 to 8 for Shifts 1, 2, 3, 4
  for (let p = 2; p <= 6; p++) {
    doc.addPage();
    drawNotationPageHeader(doc, {
      title: 'HYBRID PENTATONICS',
      pageNum: p,
      totalPages: 6,
      albumInfo: ''
    });

    curY = 32;
    curY = drawPowerTabSystem(doc, {
      y: curY,
      startMeasureNumber: 10 + (p - 2) * 10,
      sectionLabel: `Shift ${p - 1} - Shapes Progression`,
      has8va: p >= 4,
      measures: [
        {
          notes: [
            { string: 6, fret: 5 + p, hybrid: true }, { string: 5, fret: 8 + p }, { string: 4, fret: 7 + p },
            { string: 6, fret: 5 + p, hybrid: true }, { string: 5, fret: 8 + p }, { string: 4, fret: 7 + p },
            { string: 5, fret: 5 + p, hybrid: true }, { string: 4, fret: 7 + p }, { string: 3, fret: 7 + p },
            { string: 5, fret: 5 + p, hybrid: true }, { string: 4, fret: 7 + p }, { string: 3, fret: 7 + p },
            { string: 4, fret: 5 + p, hybrid: true }, { string: 3, fret: 7 + p }, { string: 2, fret: 8 + p },
            { string: 4, fret: 5 + p, hybrid: true }
          ]
        }
      ]
    });
  }

  const destPath = path.join(PDF_DIR, 'hybrid-picking.pdf');
  fs.writeFileSync(destPath, Buffer.from(doc.output('arraybuffer')));
  console.log('Successfully generated:', destPath);
}

// ===========================================================================
// 6. GENERATE WALKING ARPEGGIO (4 PAGES)
// ===========================================================================
function generateWalkingArpeggioPdf() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Page 1: Cover
  drawCoverPage(doc, {
    title: 'Walking Arpeggio',
    masterclassLevel: 'INTERMEDIATE',
    themeColor: [230, 180, 20]
  });

  // Page 2: Promo Luca Mantovanelli
  drawPromoPage(doc, 'mantovanelli_jazz');

  // Page 3: Notation Page 1 of 2
  doc.addPage();
  drawNotationPageHeader(doc, {
    title: 'WALKING ARPEGGIO',
    pageNum: 1,
    totalPages: 2,
    albumInfo: '(From the 2016 Album LUCA MANTOVANELLI PENTATONIC MASTERCLASS 2: INTERMEDIATE)',
    tempoBpm: 90
  });

  let curY = 50;

  // System 1: [A] Sequence 1 (Rising slides)
  curY = drawPowerTabSystem(doc, {
    y: curY,
    startMeasureNumber: 1,
    sectionLabel: '[A] Sequence 1',
    timeSignature: '4/4',
    measures: [
      {
        isTriplet: true,
        notes: [
          { string: 4, fret: 5 }, { string: 3, fret: 3 }, { string: 3, fret: 3 },
          { string: 4, fret: 5, slide: true }, { string: 4, fret: 7 }, { string: 3, fret: 5 },
          { string: 4, fret: 5 }, { string: 4, fret: 7, slide: true }, { string: 4, fret: 9 },
          { string: 3, fret: 8 }, { string: 3, fret: 8 }, { string: 4, fret: 9, slide: true }
        ]
      },
      {
        isTriplet: true,
        notes: [
          { string: 4, fret: 12 }, { string: 3, fret: 10 }, { string: 3, fret: 10 },
          { string: 4, fret: 12, slide: true }, { string: 4, fret: 14 }, { string: 3, fret: 13 },
          { string: 4, fret: 12 }, { string: 4, fret: 14, slide: true }, { string: 4, fret: 17 },
          { string: 3, fret: 15 }, { string: 3, fret: 15 }, { string: 4, fret: 17, slide: true }
        ]
      }
    ]
  });

  // System 2: [B] Sequence 2
  curY = drawPowerTabSystem(doc, {
    y: curY + 4,
    startMeasureNumber: 5,
    sectionLabel: '[B] Sequence 2',
    measures: [
      {
        isTriplet: true,
        notes: [
          { string: 5, fret: 5 }, { string: 4, fret: 2 }, { string: 4, fret: 3 },
          { string: 5, fret: 5, slide: true }, { string: 5, fret: 7 }, { string: 4, fret: 5 },
          { string: 5, fret: 5 }, { string: 5, fret: 7, slide: true }, { string: 5, fret: 10 },
          { string: 4, fret: 7 }, { string: 4, fret: 8 }, { string: 5, fret: 10, slide: true }
        ]
      },
      {
        isTriplet: true,
        notes: [
          { string: 5, fret: 12 }, { string: 4, fret: 9 }, { string: 4, fret: 10 },
          { string: 5, fret: 12, slide: true }, { string: 5, fret: 14 }, { string: 4, fret: 12 },
          { string: 4, fret: 13 }, { string: 5, fret: 14, slide: true }, { string: 5, fret: 17 },
          { string: 4, fret: 14 }, { string: 4, fret: 15 }, { string: 5, fret: 17, slide: true }
        ]
      }
    ]
  });

  // Page 4: Notation Page 2 of 2
  doc.addPage();
  drawNotationPageHeader(doc, {
    title: 'WALKING ARPEGGIO',
    pageNum: 2,
    totalPages: 2,
    albumInfo: ''
  });

  curY = 32;
  // System 3: [D] Sequence 4 (Descending slide patterns)
  drawPowerTabSystem(doc, {
    y: curY,
    startMeasureNumber: 13,
    sectionLabel: '[D] Sequence 4',
    measures: [
      {
        isTriplet: true,
        notes: [
          { string: 5, fret: 5 }, { string: 4, fret: 3 }, { string: 4, fret: 2 },
          { string: 5, fret: 5, slide: true }, { string: 5, fret: 8 }, { string: 4, fret: 5 },
          { string: 5, fret: 5 }, { string: 5, fret: 8, slide: true }, { string: 5, fret: 10 },
          { string: 4, fret: 7 }, { string: 4, fret: 7 }, { string: 5, fret: 10, slide: true }
        ]
      },
      {
        isTriplet: true,
        notes: [
          { string: 5, fret: 12 }, { string: 4, fret: 10 }, { string: 4, fret: 10 },
          { string: 5, fret: 12, slide: true }, { string: 5, fret: 15 }, { string: 4, fret: 12 },
          { string: 4, fret: 12 }, { string: 5, fret: 15, slide: true }, { string: 5, fret: 17 },
          { string: 4, fret: 15 }, { string: 4, fret: 14 }, { string: 5, fret: 17, slide: true }
        ]
      }
    ]
  });

  const destPath = path.join(PDF_DIR, 'walking-arpeggio.pdf');
  fs.writeFileSync(destPath, Buffer.from(doc.output('arraybuffer')));
  console.log('Successfully generated:', destPath);
}

// ---------------------------------------------------------------------------
// RUN ALL GENERATORS
// ---------------------------------------------------------------------------
console.log('Generating Authentic JamTrackCentral PDFs with Cover Pages Included...');
generateLinkingShapesPdf();
generateVariation01Pdf();
generateVariation02Pdf();
generateArpeggio01Pdf();
generateHybridPentatonicsPdf();
generateWalkingArpeggioPdf();
console.log('All JamTrackCentral PDFs created successfully!');
