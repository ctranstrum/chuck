// Surface mounted tactile momentary switch activated from above.
//
// It might be the PTS526 Series reset switch
//
// Datasheet:
//  https://www.ckswitches.com/media/2780/pts526.pdf
//
// though the one I bought is taller than what is mentioned in the datasheet
//  https://www.amazon.com/uxcell-5x5x3mm-Momentary-Button-Tactile/dp/B07H9QRFTQ
// or here:
//  https://www.aliexpress.us/item/3256806760201032.html
//    (strangely listed as 4x4x3 even though the dimensions show 5.1x5.1x3)

module.exports = {
  params: {
    designator: "SW",
    side: "F",
    include_silkscreen: true,
    include_fabrication: true,
    include_courtyard: true,
    from: { type: "net", value: "RST" },
    to: { type: "net", value: "GND" },
  },
  body: (p) => {
    let footprint = `
    (footprint "pts526"
        (layer "${p.side}.Cu")
        ${p.at}
        (property "Reference" "${p.ref}"
            (at 0 4.8 ${p.r})
            (layer "${p.side}.SilkS")
            ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
        )
    `;
    if (p.include_fabrication) {
      footprint += `
        (fp_circle (center 0 0) (end 1 1) (stroke (width 0.1) (type solid)) (layer "${p.side}.Fab"))
      `;
    }
    if (p.include_courtyard) {
      const courtyard = `(stroke (width 0.05) (type solid)) (layer "${p.side}.CrtYd")`;
      footprint += `
        (fp_line (start -4.5 -3) (end -4.5 3) ${courtyard})
        (fp_line (start -4.5 3) (end 4.5 3) ${courtyard})
        (fp_line (start 4.5 3) (end 4.5 -3) ${courtyard})
        (fp_line (start 4.5 -3) (end -4.5 -3) ${courtyard})
      `;
    }
    if (p.include_silkscreen) {
      const silk = `(stroke (width 0.12) (type solid)) (layer "${p.side}.SilkS")`;
      footprint += `
        (fp_line (start -2.6 -1.5) (end -2.6 1.5) ${silk})
        (fp_line (start -2.6 1.5) (end -1.5 2.6) ${silk})
        (fp_line (start -1.5 2.6) (end 1.5 2.6) ${silk})
        (fp_line (start 1.5 2.6) (end 2.6 1.5) ${silk})
        (fp_line (start 2.6 1.5) (end 2.6 -1.5) ${silk})
        (fp_line (start 2.6 -1.5) (end 1.5 -2.6) ${silk})
        (fp_line (start 1.5 -2.6) (end -1.5 -2.6) ${silk})
        (fp_line (start -1.5 -2.6) (end -2.6 -1.5) ${silk})
      `;
    }
    const pads = `(size 2 1) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask")`;
    footprint += `
        (pad "1" smd rect (at -3 1.85 ${p.r}) ${pads} ${p.from.str})
        (pad "1" smd rect (at 3 1.85 ${p.r}) ${pads} ${p.from.str})
        (pad "2" smd rect (at 3 -1.85 ${p.r}) ${pads} ${p.to.str})
        (pad "2" smd rect (at -3 -1.85 ${p.r}) ${pads} ${p.to.str})
    )
    `;

    return footprint;
  },
};
