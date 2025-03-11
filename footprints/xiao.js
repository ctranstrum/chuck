// Reversible Seeed XIAO
//

module.exports = {
  params: {
    designator: "MCU",
    orientation: "up",
    side: "*",
    P0: { type: "net", value: "P0" },
    P1: { type: "net", value: "P1" },
    P2: { type: "net", value: "P2" },
    P3: { type: "net", value: "P3" },
    P4: { type: "net", value: "P4" },
    P5: { type: "net", value: "P5" },
    P6: { type: "net", value: "P6" },
    VUSB: { type: "net", value: "VUSB" },
    GND: { type: "net", value: "GND" },
    VCC: { type: "net", value: "VCC" },
    P10: { type: "net", value: "P10" },
    P9: { type: "net", value: "P9" },
    P8: { type: "net", value: "P8" },
    P7: { type: "net", value: "P7" },
    vias: true,
  },
  body: (p) => {
    const is_up = p.orientation == "up";
    const { def_neg, def_pos } = is_up
      ? { def_neg: "-", def_pos: "" }
      : { def_neg: "", def_pos: "-" };

    let randNum = 0;
    const randNet = () => `XX${randNum++}`;

    const net = (n) => (p[n].name === "none" ? "" : p[n].str);
    const name = (n) => (p[n].name === "none" ? n : p[n].name);

    const standard = `
      (module xiao-ble (layer F.Cu) (tedit 5B307E4C)
      ${p.at /* parametric position */}

      ${"" /* footprint reference */}
      (fp_text reference "${p.ref}" (at -19.3989 -11.28268) (layer B.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))

      ${
        "" /* notes
      (fp_text user "SEEED XIAO BLE\\nFACE ${is_up ? 'UP' : 'DOWN'}" (at ${def_pos}5 -1 ${p.rot} unlocked) (layer B.SilkS) (effects (font (size 1 1) (thickness 0.15)) (justify left)))
      turned off for now, but it's cool, so maybe turn it on later /* }

      ${''/* illustration of the (possible) USB port overhang */
      }
      (fp_line (start -3.81 -12.02) (end -3.81 -6.94) (layer Dwgs.User) (width 0.15))
      (fp_line (start 3.81 -12.02) (end -3.81 -12.02) (layer Dwgs.User) (width 0.15))
      (fp_line (start 3.81 -6.94) (end 3.81 -12.02) (layer Dwgs.User) (width 0.15))
      (fp_line (start -3.81 -6.94) (end 3.81 -6.94) (layer Dwgs.User) (width 0.15))

      ${"" /* component outline */}
      (fp_line (start 8.89 3.545) (end 8.89 4.075) (layer "B.SilkS") (width 0.12))
      (fp_line (start 8.89 0.995) (end 8.89 1.525) (layer "B.SilkS") (width 0.12))
      (fp_line (start 8.89 6.085) (end 8.89 6.615) (layer "B.SilkS") (width 0.12))
      (fp_line (start -8.89 3.535) (end -8.89 4.065) (layer "B.SilkS") (width 0.12))
      (fp_line (start -8.89 -10.5) (end 8.89 -10.5) (layer "B.SilkS") (width 0.12))
      (fp_line (start -8.89 -8.6) (end -8.89 -10.5) (layer "B.SilkS") (width 0.12))
      (fp_line (start 8.89 -4.075) (end 8.89 -3.545) (layer "B.SilkS") (width 0.12))
      (fp_line (start -8.89 -6.625) (end -8.89 -6.095) (layer "B.SilkS") (width 0.12))
      (fp_line (start -8.89 10.5) (end -8.89 8.6) (layer "B.SilkS") (width 0.12))
      (fp_line (start 8.89 -10.49) (end 8.89 -8.65) (layer "B.SilkS") (width 0.12))
      (fp_line (start 8.89 -1.535) (end 8.89 -1.005) (layer "B.SilkS") (width 0.12))
      (fp_line (start -8.89 6.075) (end -8.89 6.605) (layer "B.SilkS") (width 0.12))
      (fp_line (start -8.89 -1.545) (end -8.89 -1.015) (layer "B.SilkS") (width 0.12))
      (fp_line (start -8.89 -4.085) (end -8.89 -3.555) (layer "B.SilkS") (width 0.12))
      (fp_line (start 8.89 -6.61) (end 8.89 -6.08) (layer "B.SilkS") (width 0.12))
      (fp_line (start 8.89 8.61) (end 8.89 10.5) (layer "B.SilkS") (width 0.12))
      (fp_line (start 8.89 10.5) (end -8.89 10.5) (layer "B.SilkS") (width 0.12))
      (fp_line (start -8.89 0.995) (end -8.89 1.525) (layer "B.SilkS") (width 0.12))
      (fp_rect (start -8.89 10.5) (end 8.89 -10.5) (layer "Dwgs.User") (width 0.12) (fill none))
      (fp_rect (start 3.350197 -6.785813) (end 5.128197 -4.118813) (layer "Dwgs.User") (width 0.12) (fill none))
      (fp_rect (start -3.507811 -8.182813) (end -5.285811 -10.849813) (layer "Dwgs.User") (width 0.12) (fill none))
      (fp_rect (start 3.350197 -10.849813) (end 5.128197 -8.182813) (layer "Dwgs.User") (width 0.12) (fill none))
      (fp_rect (start -5.285811 -6.785813) (end -3.507811 -4.118813) (layer "Dwgs.User") (width 0.12) (fill none))
    `;

    function pins(def_neg, def_pos, side) {
      const mirror = side === "B" ? " mirror" : "";
      const layer = `(layer ${side}.SilkS)`;
      const layers = `(layers ${side}.Cu ${side}.Mask ${side}.Paste)`;
      const font = "(effects (font (size 1 1) (thickness 0.15)) ";
      const font1 = `${font} (justify left${mirror}))`;
      const font2 = `${font} (justify right${mirror}))`;
      return `
        ${"" /* extra border around pin 1, in case the rectangular shape is not distinctive enough */}
        (fp_line (start ${def_pos}6.35 -6.35) (end ${def_pos}6.35 -3.81) ${layer} (width 0.15))
        (fp_line (start ${def_pos}6.35 -6.35) (end ${def_pos}9.7 -6.35) ${layer} (width 0.15))
        (fp_line (start ${def_pos}6.35 -3.81) (end ${def_pos}9.7 -3.81) ${layer} (width 0.15))
        (fp_line (start ${def_pos}9.7 -6.35) (end ${def_pos}9.7 -3.81) ${layer} (width 0.15))

        ${"" /* pin names */}
        (fp_text user "P0" (at ${def_neg}9.5 -7.62 ${p.rot}) ${layer} ${font1})
        (fp_text user "P1" (at ${def_neg}9.5 -5.08 ${p.rot}) ${layer} ${font1})
        (fp_text user "P2" (at ${def_neg}9.5 -2.54 ${p.rot}) ${layer} ${font1})
        (fp_text user "P3" (at ${def_neg}9.5 -0 ${p.rot}) ${layer} ${font1})
        (fp_text user "P4" (at ${def_neg}9.5 2.54 ${p.rot}) ${layer} ${font1})
        (fp_text user "P5" (at ${def_neg}9.5 5.08 ${p.rot}) ${layer} ${font1})
        (fp_text user "P6" (at ${def_neg}9.5 7.62 ${p.rot}) ${layer} ${font1})

        (fp_text user "VUSB" (at ${def_pos}9.5 -7.62 ${p.rot}) ${layer} ${font2})
        (fp_text user "GND" (at ${def_pos}9.7 -5.08 ${p.rot}) ${layer} ${font2})
        (fp_text user "VCC" (at ${def_pos}9.5 -2.54 ${p.rot}) ${layer} ${font2})
        (fp_text user "P10" (at ${def_pos}9.5 0 ${p.rot}) ${layer} ${font2})
        (fp_text user "P9" (at ${def_pos}9.5 2.54 ${p.rot}) ${layer} ${font2})
        (fp_text user "P8" (at ${def_pos}9.5 5.08 ${p.rot}) ${layer} ${font2})
        (fp_text user "P7" (at ${def_pos}9.5 7.62 ${p.rot}) ${layer} ${font2})

        ${"" /* and now the actual pins */}
        (pad 1 smd oval (at ${def_neg}8.12 -7.62 ${p.rot}) (size 2.75 1.8) ${layers} ${net("P0")})
        (pad 2 smd oval (at ${def_neg}8.12 -5.08 ${p.rot}) (size 2.75 1.8) ${layers} ${net("P1")})
        (pad 3 smd oval (at ${def_neg}8.12 -2.54 ${p.rot}) (size 2.75 1.8) ${layers} ${net("P2")})
        (pad 4 smd oval (at ${def_neg}8.12 0 ${p.rot}) (size 2.75 1.8) ${layers} ${net("P3")})
        (pad 5 smd oval (at ${def_neg}8.12 2.54 ${p.rot}) (size 2.75 1.8) ${layers} ${net("P4")})
        (pad 6 smd oval (at ${def_neg}8.12 5.08 ${p.rot}) (size 2.75 1.8) ${layers} ${net("P5")})
        (pad 7 smd oval (at ${def_neg}8.12 7.62 ${p.rot}) (size 2.75 1.8) ${layers} ${net("P6")})

        (pad 8 smd oval (at ${def_pos}8.12 7.62 ${p.rot + 180}) (size 2.75 1.8) ${layers} ${net("P7")})
        (pad 9 smd oval (at ${def_pos}8.12 5.08 ${p.rot + 180}) (size 2.75 1.8) ${layers} ${net("P8")})
        (pad 10 smd oval (at ${def_pos}8.12 2.54 ${p.rot + 180}) (size 2.75 1.8) ${layers} ${net("P9")})
        (pad 11 smd oval (at ${def_pos}8.12 0 ${p.rot + 180}) (size 2.75 1.8) ${layers} ${net("P10")})
        (pad 12 smd oval (at ${def_pos}8.12 -2.54 ${p.rot + 180}) (size 2.75 1.8) ${layers} ${net("VCC")})
        (pad 13 smd rect (at ${def_pos}8.12 -5.08 ${p.rot + 180}) (size 2.75 1.8) ${layers} ${net("GND")})
        (pad 14 smd oval (at ${def_pos}8.12 -7.62 ${p.rot + 180}) (size 2.75 1.8) ${layers} ${net("VUSB")})
      `;
    }

    function via(num, x, y, net) {
      return `(pad ${num} thru_hole circle (at ${x} ${y}) (size 0.6 0.6) (drill 0.3) (layers *.Cu) ${net})`;
    }

    function vias(def_neg, def_pos, x, y) {
      const left = def_neg + String(x + 10);
      const right = def_pos + String(x + 10);
      return `
        ${net("P0") ? via(15, left, -7.62 + y, net("P0")) : ""}
        ${net("P1") ? via(16, left, -5.08 + y, net("P1")) : ""}
        ${net("P2") ? via(17, left, -2.54 + y, net("P2")) : ""}
        ${net("P3") ? via(18, left, 0 + y, net("P3")) : ""}
        ${net("P4") ? via(19, left, 2.54 + y, net("P4")) : ""}
        ${net("P5") ? via(20, left, 5.08 + y, net("P5")) : ""}
        ${net("P6") ? via(20, left, 7.62 + y, net("P6")) : ""}
        ${net("VUSB") ? via(21, right, -7.62 + y, net("VUSB")) : ""}
        ${net("GND") ? via(22, right, -5.08 + y, net("GND")) : ""}
        ${net("VCC") ? via(23, right, -2.54 + y, net("VCC")) : ""}
        ${net("P10") ? via(24, right, 0 + y, net("P10")) : ""}
        ${net("P9") ? via(25, right, 2.54 + y, net("P9")) : ""}
        ${net("P8") ? via(26, right, 5.08 + y, net("P8")) : ""}
        ${net("P7") ? via(27, right, 7.62 + y, net("P7")) : ""}
      `;
    }

    return `
      ${standard}
      ${p.side === "B" ? "" : pins(def_neg, def_pos, "F")}
      ${p.side === "F" ? "" : pins(def_pos, def_neg, "B")}
      ${p.side === "B" ? "" : vias(def_neg, def_pos, 4, 0)}
      ${p.side === "F" ? "" : vias(def_pos, def_neg, 0, 1.27)}
      )
      `;
  },
};
