module.exports = {
  params: {
    side: "both",
    designator: "D",
    A: undefined,
    B: undefined,
    C: undefined,
    via: false,
    labels: false,
    label_side: "left",
    label_rotation: 0,
    common: "anode",
  },
  body: (p) => {
    // SMD pads on both sides: SOD-123 footprint
    const side = p.side === "B" ? "B" : "F";
    const both = p.side === "both";
    const rotation = p.r + p.label_rotation;

    let smdPads = "";
    if (both || side === "F") {
      smdPads = `
      (pad 1 smd rect (at -0.95 1 ${p.r}) (size 1 1) (layers F.Cu F.Paste F.Mask) ${p.A})
      (pad 2 smd rect (at 0.95 1 ${p.r}) (size 1 1) (layers F.Cu F.Paste F.Mask) ${p.B})
      (pad 3 smd rect (at 0 -1 ${p.r}) (size 1 1) (layers F.Cu F.Paste F.Mask) ${p.C})
      `;
    }
    if (both || side === "B") {
      smdPads += `
      (pad 3 smd rect (at 0 -1 ${p.r}) (size 1 1) (layers B.Cu B.Paste B.Mask) ${p.C})
      (pad 2 smd rect (at 0.95 1 ${p.r}) (size 1 1) (layers B.Cu B.Paste B.Mask) ${p.B})
      (pad 1 smd rect (at -0.95 1 ${p.r}) (size 1 1) (layers B.Cu B.Paste B.Mask) ${p.A})
    `;
    }

    // Vias
    const vias = p.via
      ? `
        (pad 1 thru_hole circle (at -0.95 1) (size 0.6 0.6) (drill 0.3) (layers *.Cu) ${p.A})
        (pad 2 thru_hole circle (at 0.95 1) (size 0.6 0.6) (drill 0.3) (layers *.Cu) ${p.B})
        (pad 3 thru_hole circle (at 0 -1) (size 0.6 0.6) (drill 0.3) (layers *.Cu) ${p.C})
      `
      : "";

    let labels = "";
    if (p.labels) {
      const dist = p.label_rotation ? 3 : 2;
      const x = p.label_side === "left" ? dist : dist * -1;
      const justify = p.label_rotation
        ? ""
        : p.label_side === "left"
          ? " (justify left)"
          : " (justify right)";
      const mirror = p.label_rotation
        ? ""
        : p.label_side === "left"
          ? " left"
          : " right";
      if (both || side === "F") {
        labels = `
        (fp_text user "${p.ref}" (at ${x} 0 ${rotation}) (layer F.SilkS) (effects (font (size 1 1) (thickness 0.15))${justify}))
      `;
      }
      if (both || side === "B") {
        labels += `
        (fp_text user "${p.ref}" (at ${x} 0 ${rotation}) (layer B.SilkS) (effects (font (size 1 1) (thickness 0.15)) (justify${mirror} mirror)))
      `;
      }
    }

    let outline = "";
    if (both || side === "F") {
      outline = `
        (fp_line (start -1.5 -0.7) (end -1.5 0.7) (layer F.SilkS) (width 0.15))
        (fp_line (start -1.5 0.7) (end 1.5 0.7) (layer F.SilkS) (width 0.15))
        (fp_line (start 1.5 0.7) (end 1.5 -0.7) (layer F.SilkS) (width 0.15))
        (fp_line (start 1.5 -0.7) (end -1.5 -0.7) (layer F.SilkS) (width 0.15))
      `;
    }
    if (both || side === "B") {
      outline += `
        (fp_line (start -1.5 -0.7) (end -1.5 0.7) (layer B.SilkS) (width 0.15))
        (fp_line (start -1.5 0.7) (end 1.5 0.7) (layer B.SilkS) (width 0.15))
        (fp_line (start 1.5 0.7) (end 1.5 -0.7) (layer B.SilkS) (width 0.15))
        (fp_line (start 1.5 -0.7) (end -1.5 -0.7) (layer B.SilkS) (width 0.15))
      `;
    }

    const sym = (x, side, left) => {
      const dir = left ? 1 : -1;
      return `
        (fp_line (start ${x + dir * 0.25} 0) (end ${x + dir * 0.75} 0) (layer ${side}.SilkS) (width 0.15))
        (fp_line (start ${x + dir * 0.25} 0.4) (end ${x - dir * 0.35} 0) (layer ${side}.SilkS) (width 0.15))
        (fp_line (start ${x + dir * 0.25} -0.4) (end ${x + dir * 0.25} 0.4) (layer ${side}.SilkS) (width 0.15))
        (fp_line (start ${x - dir * 0.35} 0) (end ${x + dir * 0.25} -0.4) (layer ${side}.SilkS) (width 0.15))
        (fp_line (start ${x - dir * 0.35} 0) (end ${x - dir * 0.35} 0.55) (layer ${side}.SilkS) (width 0.15))
        (fp_line (start ${x - dir * 0.35} 0) (end ${x - dir * 0.35} -0.55) (layer ${side}.SilkS) (width 0.15))
        (fp_line (start ${x - dir * 0.75} 0) (end ${x - dir * 0.35} 0) (layer ${side}.SilkS) (width 0.15))
      `;
    };

    return `
      (module ComboDiode (layer ${side}.Cu) (tedit 6B28D38B)
        ${p.at /* parametric position */}

        ${"" /* footprint reference */}
        (fp_text reference "${p.ref}" (at 0 -2 ${p.r}) (layer ${side}.SilkS) ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
        (fp_text value "" (at 0 -2) (layer ${side}.Fab) hide (effects (font (size 1 1) (thickness 0.15))))

        ${outline}

        ${"" /* diode symbols */}
        ${
          both || side === "F"
            ? `${sym(-0.5, "F", p.common === "anode")} ${sym(0.5, "F", p.common === "cathode")}`
            : ""
        }
        ${
          both || side === "B"
            ? `${sym(-0.5, "B", p.common === "anode")} ${sym(0.5, "B", p.common === "cathode")}`
            : ""
        }

        ${smdPads}
        ${vias}
        ${labels}

      )
    `;
  },
};
