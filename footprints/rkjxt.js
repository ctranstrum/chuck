/* Alps Alpine RKJXT 4-directional stick switch
 * (with encoder / center-push function)
 *
 * Product Page: https://www.mouser.com/new/alps-alpine/alps-electric-rkjxt-stick-switches/
 * Datasheet: https://www.mouser.com/datasheet/3/381/1/product_catalog_mu_02_rkjxt1f_en_9fa93dd1ce.pdf
 *
 */

module.exports = {
  params: {
    designator: "ENC",
    side: "F",
    include_silkscreen: true,
    A: { type: "net", value: "UP" },
    B: { type: "net", value: "LEFT" },
    C: { type: "net", value: "DOWN" },
    D: { type: "net", value: "RIGHT" },
    PUSH: { type: "net", value: "PUSH" },
    COM: { type: "net", value: "COM" },
    ENC_A: { type: "net", value: "ENC_A" },
    ENC_B: { type: "net", value: "ENC_B" },
    ENC_COM: { type: "net", value: "ENC_COM" },
    GND: { type: "net", value: "GND" },
  },
  body: (p) => {
    const netStr = (net) => (net.name ? net.str : "");
    // minus sign for left on front, or right on back
    const right = p.side === "F" ? "" : "-";
    const left = right === "-" ? "" : "-";
    // minus sign for up/down
    const up = "-";
    const down = "";
    const at = (hsign, hval, vsign, vval) =>
      `(at ${hsign}${hval} ${vsign}${vval} ${p.r})`;
    const hole =
      'thru_hole circle (size 1.3 1.3) (drill 1) (layers "*.Cu" "*.Mask")';
    const lug =
      'np_thru_hole circle (size 1.1 1.1) (drill 1.1) (layers "*.Cu" "*.Mask")';
    return `
    (module Alps_Alpine_RKJXT (layer ${p.side}.Cu)
      (descr "https://www.mouser.com/datasheet/2/15/rkjxt-1890304.pdf")
      (tags "RKJXT ENCODER")
      (layer "${p.side}.Cu") ${p.at}
      (property "Reference" "${p.ref}" (at 0 -8.5)
        (layer "${p.side}.${p.include_silkscreen ? "SilkS" : "Fab"}")
        ${p.ref_hide}
        (effects (font (size 1 1) (thickness 0.15))${p.side == "B" ? " (justify mirror)" : ""})
      )
      (fp_text user "RKJXT" (at 0 0)
        (layer "${p.side}.${p.include_silkscreen ? "SilkS" : "Fab"}")
        (effects (font (size 1 1) (thickness 0.15))${p.side == "B" ? " (justify mirror)" : ""})
      )
      (pad "A" ${hole} ${at(left, 1.5, down, 7.8)} ${netStr(p.A)})
      (pad "B" ${hole} ${at(right, 7.8, down, 1.5)} ${netStr(p.B)})
      (pad "C" ${hole} ${at(right, 1.5, up, 7.8)} ${netStr(p.C)})
      (pad "D" ${hole} ${at(left, 7.8, up, 1.5)} ${netStr(p.D)})
      (pad "PUSH" ${hole} ${at(right, 1, down, 6.98)} ${netStr(p.PUSH)})
      (pad "COM" ${hole} ${at(left, 1, up, 5.78)} ${netStr(p.COM)})
      (pad "ENC_A" ${hole} ${at(left, 7.8, down, 1.5)} ${netStr(p.ENC_A)})
      (pad "ENC_B" ${hole} ${at(right, 7.8, up, 1.5)} ${netStr(p.ENC_B)})
      (pad "ENC_COM" ${hole} ${at(left, 1.5, up, 7.8)} ${netStr(p.ENC_COM)})
      (pad "GND" ${hole} ${at(right, 6.86, down, 3.75)} ${netStr(p.GND)})
      (pad "" ${lug} ${at(left, 3.8, down, 1.5)})
    )
`;
  },
};
