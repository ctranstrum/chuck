module.exports = {
  params: {
    side: "both",
    designator: "D",
    from: undefined,
    to: undefined,
    tht: false,
    smd: false,
    via: "none",
    labels: false,
    label_rotation: 0,
  },
  body: (p) => {
    // SMD pads on both sides: SOD-123 footprint
    const side = p.side === "B" ? "B" : "F";
    const both = p.side === "both";
    const rotation = p.r + p.label_rotation;

    let smdPads = "";
    if (p.smd) {
      if (both || side === "F") {
        smdPads = `
      (pad 1 smd rect (at -1.65 0 ${p.r}) (size 1.2 1.2) (layers F.Cu F.Paste F.Mask) ${p.to})
      (pad 2 smd rect (at 1.65 0 ${p.r}) (size 1.2 1.2) (layers F.Cu F.Paste F.Mask) ${p.from})
      `;
      }
      if (both || side === "B") {
        smdPads += `
      (pad 2 smd rect (at 1.65 0 ${p.r}) (size 1.2 1.2) (layers B.Cu B.Paste B.Mask) ${p.from})
      (pad 1 smd rect (at -1.65 0 ${p.r}) (size 1.2 1.2) (layers B.Cu B.Paste B.Mask) ${p.to})
    `;
      }
    }

    // THT terminals
    const thtTerminals = p.tht
      ? `
      (pad 1 thru_hole rect (at -3.81 0 ${p.r}) (size 1.778 1.778) (drill 0.9906) (layers *.Cu *.Mask) ${p.to})
      (pad 2 thru_hole circle (at 3.81 0 ${p.r}) (size 1.905 1.905) (drill 0.9906) (layers *.Cu *.Mask) ${p.from})
    `
      : "";

    // Vias
    let vias = "";
    if (p.via === "pad") {
      vias = `
        (pad 1 thru_hole circle (at -1.65 0) (size 0.6 0.6) (drill 0.3) (layers *.Cu) ${p.to})
        (pad 2 thru_hole circle (at 1.65 0) (size 0.6 0.6) (drill 0.3) (layers *.Cu) ${p.from})
      `;
    } else if (p.via === "middle") {
      vias = `
        (pad 1 thru_hole circle (at -0.45 0) (size 0.6 0.6) (drill 0.3) (layers *.Cu) ${p.to})
        (pad 2 thru_hole circle (at 0.45 0) (size 0.6 0.6) (drill 0.3) (layers *.Cu) ${p.from})
      `;
    }

    let labels = "";
    if (p.labels) {
      if (both || side === "F") {
        labels = `
        (fp_text user "${p.ref}" (at -5 0 ${rotation}) (layer F.SilkS) (effects (font (size 1 1) (thickness 0.15))))
      `;
      }
      if (both || side === "B") {
        labels = `
        (fp_text user "${p.ref}" (at -5 0 ${rotation}) (layer B.SilkS) (effects (font (size 1 1) (thickness 0.15)) (justify mirror)))
      `;
      }
    }

    return `
      (module ComboDiode (layer ${side}.Cu) (tedit 5B24D78E)
        ${p.at /* parametric position */}

        ${"" /* footprint reference */}
        (fp_text reference "${p.ref}" (at 0 -2 ${p.r}) (layer ${side}.SilkS) ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
        (fp_text value "" (at 0 -2) (layer ${side}.Fab) hide (effects (font (size 1 1) (thickness 0.15))))

        ${"" /* diode symbols */}
        ${
          both || side === "F"
            ? `
        (fp_line (start 0.25 0) (end 0.75 0) (layer F.SilkS) (width 0.15))
        (fp_line (start 0.25 0.4) (end -0.35 0) (layer F.SilkS) (width 0.15))
        (fp_line (start 0.25 -0.4) (end 0.25 0.4) (layer F.SilkS) (width 0.15))
        (fp_line (start -0.35 0) (end 0.25 -0.4) (layer F.SilkS) (width 0.15))
        (fp_line (start -0.35 0) (end -0.35 0.55) (layer F.SilkS) (width 0.15))
        (fp_line (start -0.35 0) (end -0.35 -0.55) (layer F.SilkS) (width 0.15))
        (fp_line (start -0.75 0) (end -0.35 0) (layer F.SilkS) (width 0.15))
        `
            : ""
        }
        ${
          both || side === "B"
            ? `
        (fp_line (start 0.25 0) (end 0.75 0) (layer B.SilkS) (width 0.15))
        (fp_line (start 0.25 0.4) (end -0.35 0) (layer B.SilkS) (width 0.15))
        (fp_line (start 0.25 -0.4) (end 0.25 0.4) (layer B.SilkS) (width 0.15))
        (fp_line (start -0.35 0) (end 0.25 -0.4) (layer B.SilkS) (width 0.15))
        (fp_line (start -0.35 0) (end -0.35 0.55) (layer B.SilkS) (width 0.15))
        (fp_line (start -0.35 0) (end -0.35 -0.55) (layer B.SilkS) (width 0.15))
        (fp_line (start -0.75 0) (end -0.35 0) (layer B.SilkS) (width 0.15))
        `
            : ""
        }

        ${smdPads}
        ${thtTerminals}
        ${vias}
        ${labels}

      )
    `;
  },
};
