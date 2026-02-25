// Reversible Seeed XIAO nrf52840 Plus
//

module.exports = {
  params: {
    designator: "MCU",
    side: "F&B", // F, B, F&B
    clean_reversible: true,
    include_courtyard: true,
    include_antenna_keepout: true,
    include_user_drawing_outline: true,

    D0: { type: "net", value: "D0" },
    D1: { type: "net", value: "D1" },
    D2: { type: "net", value: "D2" },
    D3: { type: "net", value: "D3" },
    D4: { type: "net", value: "D4" },
    D5: { type: "net", value: "D5" },
    D6: { type: "net", value: "D6" },

    D7: { type: "net", value: "D7" },
    D8: { type: "net", value: "D8" },
    D9: { type: "net", value: "D9" },
    D10: { type: "net", value: "D10" },
    P3V3: { type: "net", value: "VCC" },
    GND: { type: "net", value: "GND" },
    P5V: { type: "net", value: "VUSB" },

    // extra pins
    D11: { type: "net", value: "D11" },
    D12: { type: "net", value: "D12" },
    D13: { type: "net", value: "D13" },
    D14: { type: "net", value: "D14" },
    D15: { type: "net", value: "D15" },
    D16: { type: "net", value: "none" }, // Battery meter pin, unusable

    D17: { type: "net", value: "D17" },
    D18: { type: "net", value: "D18" },
    D19: { type: "net", value: "D19" },

    BAT_A: { type: "net", value: "BAT_A" },
    BAT_B: { type: "net", value: "BAT_B" },

    RST_A: { type: "net", value: "RST_A" },
    RST_B: { type: "net", value: "RST_B" },

    xiao_3dmodel_filename: "",
    xiao_3dmodel_xyz_offset: [0, 0, 0],
    xiao_3dmodel_xyz_scale: [1, 1, 1],
    xiao_3dmodel_xyz_rotation: [0, 0, 0],
  },
  body: (p) => {
    if (p.side !== "F" && p.side !== "B" && p.side !== "F&B") {
      throw new Error("Invalid side value: " + p.side);
    }

    let lines = [];

    // courtyard
    if (p.include_courtyard) {
      lines.push(
        `(fp_poly (pts (xy -9.906 -10.541) (xy -9.906 10.541) (xy 9.906 10.541) (xy 9.906 -10.541) (xy 4.953 -10.541) (xy 4.953 -12.319) (xy -4.953 -12.319) (xy -4.953 -10.541) ) (stroke (width 0.05) (type solid) ) (fill none) (layer "F.CrtYd") )`,
      );
      lines.push(
        `(fp_poly (pts (xy -9.906 -10.541) (xy -9.906 10.541) (xy 9.906 10.541) (xy 9.906 -10.541) (xy 4.953 -10.541) (xy 4.953 -12.319) (xy -4.953 -12.319) (xy -4.953 -10.541) ) (stroke (width 0.05) (type solid) ) (fill none) (layer "B.CrtYd") )`,
      );
    }

    // outline
    function xiao_ble_plus_outline(layer, width) {
      lines.push(`
(fp_line (start -8.89 8.5725) (end -8.89 -8.5725) (stroke (width ${width}) (type solid) ) (layer "${layer}") )
(fp_line (start -6.985 10.4775) (end 6.985 10.4775) (stroke (width ${width}) (type solid) ) (layer "${layer}") )
(fp_line (start 6.985 -10.4775) (end -6.985 -10.4775) (stroke (width ${width}) (type solid) ) (layer "${layer}") )
(fp_line (start 8.89 8.5725) (end 8.89 -8.5725) (stroke (width ${width}) (type solid) ) (layer "${layer}") )
(fp_arc (start -8.89 -8.5725) (mid -8.332038 -9.919538) (end -6.985 -10.4775) (stroke (width ${width}) (type solid) ) (layer "${layer}") )
(fp_arc (start -6.985 10.4775) (mid -8.332039 9.919538) (end -8.89 8.5725) (stroke (width ${width}) (type solid) ) (layer "${layer}") )
(fp_arc (start 6.985 -10.4775) (mid 8.332038 -9.919538) (end 8.89 -8.5725) (stroke (width ${width}) (type solid) ) (layer "${layer}") )
(fp_arc (start 8.89 8.5725) (mid 8.332038 9.919538) (end 6.985 10.4775) (stroke (width ${width}) (type solid) ) (layer "${layer}") )
(fp_rect (start -4.5 -12) (end 4.5 -4.65) (stroke (width ${width}) (type default) ) (fill none) (layer "${layer}") )
`);
    }
    if (p.include_user_drawing_outline) {
      xiao_ble_plus_outline("Dwgs.User", "0.0254");
    }

    // copperpour keepout
    if (p.include_antenna_keepout) {
      lines.push(`
(zone (net 0) (net_name "") (layers "F&B.Cu") (name "XIAO BLE ANTENNA") (hatch edge 0.5) (keepout (tracks allowed) (vias allowed) (pads allowed) (copperpour not_allowed) (footprints allowed) )
  (polygon (pts ${zoneXY(p, -7, 6)} ${zoneXY(p, -7, 14)} ${zoneXY(p, 7, 14)} ${zoneXY(p, 7, 6)}) )
)`);
    }

    // battery pads
    lines.push(
      `(pad "BAT_A" thru_hole circle (at ${mil(-50)} ${mil(210)}) (size ${mil(60)} ${mil(60)}) (drill ${mil(30)}) (layers "*.Cu" "*.Mask") ${p.BAT_A})`,
    );
    lines.push(
      `(pad "BAT_B" thru_hole circle (at ${mil(50)} ${mil(210)}) (size ${mil(60)} ${mil(60)}) (drill ${mil(30)}) (layers "*.Cu" "*.Mask") ${p.BAT_B})`,
    );
    lines.push(
      `(fp_text user "+" (at ${mil(-110)} ${mil(230)} 0) (layer "B.SilkS") (effects (font (size 1 1) (thickness 0.2) (bold yes) ) ) )`,
    );
    lines.push(
      `(fp_text user "+" (at ${mil(110)} ${mil(230)} 0) (layer "F.SilkS") (effects (font (size 1 1) (thickness 0.2) (bold yes) ) ) )`,
    );
    lines.push(`
(fp_arc (start -1.524 0.4572) (mid -1.464484 0.313516) (end -1.3208 0.254) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts") )
(fp_arc (start 1.3208 0.254) (mid 1.464484 0.313516) (end 1.524 0.4572) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts") )
(fp_arc (start -1.3208 5.334) (mid -1.464484 5.274484) (end -1.524 5.1308) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts") )
(fp_arc (start 1.524 5.1308) (mid 1.464484 5.274484) (end 1.3208 5.334) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts") )
(fp_line (start 1.524 0.4572) (end 1.524 5.1308) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts") )
(fp_line (start -1.524 5.1308) (end -1.524 0.4572) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts") )
(fp_line (start 1.3208 5.334) (end -1.3208 5.334) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts") )
(fp_line (start -1.3208 0.254) (end 1.3208 0.254) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts") )
`);

    // reset pads
    lines.push(
      `(pad "RST_A" thru_hole circle (at ${mil(-50)} ${mil(-240)}) (size 1.524 1.524) (drill 1.016) (layers "*.Cu" "*.Mask") ${p.RST_A})`,
    );
    lines.push(
      `(pad "RST_B" thru_hole circle (at ${mil(50)} ${mil(-240)}) (size 1.524 1.524) (drill 1.016) (layers "*.Cu" "*.Mask") ${p.RST_B})`,
    );
    lines.push(`
(fp_line (start -1.524 -6.2992) (end -1.524 -8.89) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts") )
(fp_line (start -1.3208 -9.0932) (end 1.3208 -9.0932) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts") )
(fp_line (start 1.3208 -6.096) (end -1.3208 -6.096) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts") )
(fp_line (start 1.524 -8.89) (end 1.524 -6.2992) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts") )
(fp_arc (start -1.524 -8.89) (mid -1.464484 -9.033684) (end -1.3208 -9.0932) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts") )
(fp_arc (start -1.3208 -6.096) (mid -1.464484 -6.155516) (end -1.524 -6.2992) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts") )
(fp_arc (start 1.3208 -9.0932) (mid 1.464484 -9.033684) (end 1.524 -8.89) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts") )
(fp_arc (start 1.524 -6.2992) (mid 1.464484 -6.155516) (end 1.3208 -6.096) (stroke (width 0.05) (type default) ) (layer "Edge.Cuts") )
`);

    // pins
    /**
     * @type {{ name: string, left: boolean, cr: boolean, pos: number }[]}
     */
    // cr: clean reversible, if the pad can be swapped with the other side
    const pads = [
      { left: true, cr: false, name: "D0", pos: 0 },
      { left: true, cr: false, name: "D11", pos: 1 },
      { left: true, cr: false, name: "D1", pos: 2 },
      { left: true, cr: false, name: "D12", pos: 3 },
      { left: true, cr: false, name: "D2", pos: 4 },
      { left: true, cr: false, name: "D13", pos: 5 },
      { left: true, cr: true, name: "D3", pos: 6 },
      { left: true, cr: true, name: "D14", pos: 7 },
      { left: true, cr: true, name: "D4", pos: 8 },
      { left: true, cr: true, name: "D15", pos: 9 },
      { left: true, cr: true, name: "D5", pos: 10 },
      { left: true, cr: true, name: "D16", pos: 11 },
      { left: true, cr: true, name: "D6", pos: 12 },

      { left: false, cr: true, name: "D7", pos: 12 },
      { left: false, cr: true, name: "D17", pos: 11 },
      { left: false, cr: true, name: "D8", pos: 10 },
      { left: false, cr: true, name: "D18", pos: 9 },
      { left: false, cr: true, name: "D9", pos: 8 },
      { left: false, cr: true, name: "D19", pos: 7 },
      { left: false, cr: true, name: "D10", pos: 6 },

      { left: false, cr: false, name: "P3V3", pos: 4 },
      { left: false, cr: false, name: "GND", pos: 2 },
      { left: false, cr: false, name: "P5V", pos: 0 },
    ];
    function addPads(front) {
      const l = front ? "F" : "B";
      pads.forEach((pad) => {
        // base position: 350 mil to the left or right
        const x =
          350 *
          (pad.left ? -1 : 1) *
          // if the pad is for the B side (!front), flip the position
          // unless the pad is clean reversible and clean_reversible is enabled
          (!front && !(pad.cr && p.clean_reversible) ? -1 : 1);
        const y = -300 + 50 * pad.pos;
        lines.push(
          `(pad "${pad.name}" smd oval (at ${mil(x)} ${mil(y)} ${p.rot}) (size ${mil(60)} ${mil(32)}) (thermal_bridge_angle 45) (layers "${l}.Cu" "${l}.Paste" "${l}.Mask") ${p[pad.name]})`,
        );
      });
    }
    if (p.side != "F") {
      addPads(false);
    }
    if (p.side != "B") {
      addPads(true);
    }

    return `
(footprint "genteure:XIAO_nRF52840_Plus"
  (layer "${p.side == "F&B" ? "F" : p.side}.Cu")
  ${p.at /* parametric position */}
  (attr smd)
  ${lines.join("\n")}
)`;
  },
};

/**
 * Converts mils to millimeters.
 *
 * @param {number} mil - The value in mils to be converted.
 * @returns {number} The converted value in millimeters.
 */
function miln(mil) {
  // mil to mm
  return mil * 0.0254;
}

/**
 * Converts mils to millimeters and returns a string.
 *
 * @param {number} mil - The value in mils to be converted.
 * @returns {string} The converted value in millimeters as a string.
 */
function mil(mil) {
  // mil text
  // mil to mm, rounded to 3 decimal places and converted to string
  return miln(mil).toFixed(3);
}

function zoneXY(point, offsetX, offsetY) {
  const rad = (-point.rot * Math.PI) / 180;
  const x = point.x + offsetX * Math.cos(rad) - offsetY * Math.sin(rad);
  const y = point.y + offsetX * Math.sin(rad) + offsetY * Math.cos(rad);
  return `(xy ${x.toFixed(3)} ${y.toFixed(3)})`;
}
