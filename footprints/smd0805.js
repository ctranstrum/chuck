module.exports = {
  params: {
    side: "both",
    designator: "R",
    from: undefined,
    to: undefined,
    via: "none", // can be pad, padfrom, padto
    label: "",
    label_rotation: 0,
  },
  body: (p) => {
    // SMD pads on both sides: SMD-0805 footprint
    const side = p.side === "B" ? "B" : "F";
    const both = p.side === "both";

    let smdPads = "";
    if (both || side === "F") {
      smdPads = `
      (pad 1 smd rect (at -1.05 0 ${p.r}) (size 1.4 1.5) (layers F.Cu F.Paste F.Mask) ${p.to})
      (pad 2 smd rect (at 1.05 0 ${p.r}) (size 1.4 1.5) (layers F.Cu F.Paste F.Mask) ${p.from})
      `;
    }
    if (both || side === "B") {
      smdPads += `
      (pad 2 smd rect (at 1.05 0 ${p.r}) (size 1.4 1.5) (layers B.Cu B.Paste B.Mask) ${p.from})
      (pad 1 smd rect (at -1.05 0 ${p.r}) (size 1.4 1.5) (layers B.Cu B.Paste B.Mask) ${p.to})
    `;
    }

    // Vias
    let vias = "\n";
    if (p.via.startsWith("pad")) {
      if (p.via === "pad" || p.via === "padto") {
        vias += `
       (pad 1 thru_hole circle (at -1.05 0) (size 0.6 0.6) (drill 0.3) (layers *.Cu) ${p.to})`;
      }
      if (p.via === "pad" || p.via === "padfrom") {
        vias += `
        (pad 2 thru_hole circle (at 1.05 0) (size 0.6 0.6) (drill 0.3) (layers *.Cu) ${p.from})`;
      }
    }

    let label = "";
    if (p.label) {
      const rotation = p.r + p.label_rotation;
      if (both || side === "F") {
        label = `
        (fp_text user "${p.label}" (at -5 0 ${rotation}) (layer F.SilkS) (effects (font (size 1 1) (thickness 0.15))))
      `;
      }
      if (both || side === "B") {
        label = `
        (fp_text user "${p.label}" (at -5 0 ${rotation}) (layer B.SilkS) (effects (font (size 1 1) (thickness 0.15)) (justify mirror)))
      `;
      }
    }

    return `
      (module Smd0805 (layer ${side}.Cu)
        ${p.at /* parametric position */}

        ${"" /* footprint reference */}
        (fp_text reference "${p.ref}" (at 0 -2 ${p.r}) (layer ${side}.SilkS) ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
        (fp_text value "" (at 0 -2) (layer ${side}.Fab) hide (effects (font (size 1 1) (thickness 0.15))))

        ${"" /* 0805 shape */}
        ${
          both || side === "F"
            ? `
        (fp_line (start 1 0.625) (end 1 -0.625) (layer F.Fab) (width 0.15))
        (fp_line (start 1 -0.625) (end -1 -0.625) (layer F.Fab) (width 0.15))
        (fp_line (start -1 -0.625) (end -1 0.625) (layer F.Fab) (width 0.15))
        (fp_line (start -1 0.625) (end 1 0.625) (layer F.Fab) (width 0.15))
        `
            : ""
        }
        ${
          both || side === "B"
            ? `
        (fp_line (start 1 0.625) (end 1 -0.625) (layer B.Fab) (width 0.15))
        (fp_line (start 1 -0.625) (end -1 -0.625) (layer B.Fab) (width 0.15))
        (fp_line (start -1 -0.625) (end -1 0.625) (layer B.Fab) (width 0.15))
        (fp_line (start -1 0.625) (end 1 0.625) (layer B.Fab) (width 0.15))
        `
            : ""
        }

        ${smdPads}
        ${vias}
        ${label}

      )
    `;
  },
};
