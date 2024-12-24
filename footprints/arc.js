module.exports = {
  params: {
    designator: "ARC",
    side: "*",
  },
  body: (p) => {
    const side = p.side === "*" ? "F" : p.side;

    return `
        (module arc_guide (layer ${side}.SilkS) (tedit 5B25E79A)

            ${p.at /* parametric position */}

            ${"" /* footprint reference */}
            (fp_text reference "${p.ref}" (at 0 0) (layer ${side}.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
            (fp_text value "" (at 0 0) (layer ${side}.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

            ${p.side === "B" ? "" : "(fp_arc (start 0 -7) (mid 7 0) (end 0 7) (layer F.SilkS) (stroke (width 0.2) (type solid)))"}
            ${p.side === "F" ? "" : "(fp_arc (start 0 -7) (mid 7 0) (end 0 7) (layer B.SilkS) (stroke (width 0.2) (type solid)))"}

        )

        `;
  },
};
