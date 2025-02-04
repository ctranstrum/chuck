# One Up Chuck Build Guide

If this is your first time building a custom keyboard,
you should do two things before attempting this build.

- watch a few [soldering][how-to-solder] [tutorials][soldering101]
- read through a detailed build guide like
  the one for the [splitkb.com Aurora Series][splitkb-build-guide]

The remainder of this build guide will assume a basic familiarity with the process
and will only hit upon specific items that may be different or important to note while
building the One Up Chuck.

## Bill of materials

| Qty  | Description                                                                                              |
| ---- | -------------------------------------------------------------------------------------------------------- |
| 1    | [One Up Chuck PCB][pcb] (can be printed by uploading the [zip file][gerber] to [JLC][jlcpcb])            |
| 2    | [3D printed cases][case], top and bottom                                                                 |
| 1    | [XIAO BLE][xiao] or compatible board of your choice, as long as it is supported by [ZMK][zmk-xiao]       |
| 1    | [Panasonic EVQ-PUC02K momentary switch][reset] for the reset button                                      |
| 1    | wireless only: [Alps SSSS811101 SPDT slide switch][power] for the battery on/off                         |
| 1    | wireless only: [3.7v 250mAh 502030 rechargeable LiPo battery][battery] (max internal space: 5.3x22x32mm) |
| 42   | SOD-123 [1N4148W SMD diodes][sod123]                                                                     |
| 30   | [Gateron Low Profile hot swap sockets][sockets]                                                          |
| 30   | [Gateron KS-33 Low Profile switches][switches] of your choice                                            |
| 30   | [Low profile MX keycaps][keycaps] of your choice (note: full sized keycaps will be too big)              |
| 1    | Bourns [PEC11L-4115F-S0020][encoder]\* EC11 encoder with a [knob][case] of your choice                   |
| 12   | [M2 hex nuts][hexnuts]                                                                                   |
| 12   | [M2 x 6mm countersunk screws][screws]                                                                    |
| 10   | [6mm x 1.5mm bumpons][bumpons]                                                                           |
| ~3mm | [1.75mm transparent 3D printer filament][filament] for the "fiber optic" led light guide                 |

\* You could also use a Bourns [PES12-42S][smallencoder] EC12 encoder,
or an encoder from another manufacturer if you aren't going wireless,
but the specified encoder is designed to have its detents with both A and B set to low,
so a different option is likely to draw more power,
and thus isn't the best choice for a wireless build.

## Useful equipment

You should ideally have access to:

- a [soldering iron][pinecil]
- some [good quality solder][kester]
- a decent hands-free magnifying glass
- precision tweezers
- wire cutter / stripper
- isopropyl alcohol and an old toothbrush

## Getting the PCB

The PCB can be easily ordered from a circuit board manufacturer with an online store.
I used [JLC][jlcpcb] because--at least at the time of my order--their prices are unbeatable.

To order, you can simply upload the [gerber zip file][gerber] to their website,
accept all of the defaults, and wait a week or two for the boards to arrive.

However, the minimum order at JLC is 5 copies, so you'll likely end up
with 4 extra PCBs. I don't really have any advice for what to do with
the extras, but you maybe could give one to a friend!

A few items that you may want to customize:

- the color of the board; I printed mine in red, but whatever color you pick, the edges of the PCB will still be a little greenish
- I also chose to hide the JLC order number, to give the board a cleaner look
- HASL can be lead-free if you are also using lead-free solder, or you can splurge for ENIG, but it's definitely not required

## Good luck

I'll add more details here once I get my PCB and build it,
but if you've built keyboards before,
you shouldn't really have any trouble,
just be sure to follow the symbols on the silkscreen.

[battery]: https://ydlbattery.com/products/3-7v-250mah-502030-lithium-polymer-ion-battery
[bumpons]: https://www.walmart.com/ip/Small-Door-Bumpers-Self-Adhesive-Clear-Rubber-Feet-Tiny-Bumpons-1-4-Diameter-X-1-16-Thick-100-Pack-u2026/2377364014
[case]: cases/
[encoder]: https://www.mouser.com/ProductDetail/Bourns/PEC11L-4115F-S0020?qs=gk21WLQFtgRAgrgJZfpkWw%3D%3D
[filament]: https://gizmodorks.com/nylon-filament-200-g-spool/
[gerber]: pcb/chuck-gerbers.zip
[hexnuts]: https://www.getfpv.com/m2-black-metal-hex-nut-set-of-8.html
[how-to-solder]: https://www.google.com/search?q=youtube+how+to+solder
[jlc3dp]: https://jlc3dp.com/
[jlcpcb]: https://jlcpcb.com/
[kester]: https://typeractive.xyz/products/kester-solder-wire-tube
[keycaps]: https://nuphy.com/collections/keycaps/products/numoji-nsa
[pcb]: pcb/
[pinecil]: https://typeractive.xyz/products/pinecil
[power]: https://typeractive.xyz/products/power-switch
[reset]: https://typeractive.xyz/products/reset-button
[rgbled]: https://github.com/caksoylar/zmk-rgbled-widget
[smallencoder]: https://www.mouser.com/ProductDetail/Bourns/PES12-42S-N0024?qs=9fn1gpisni7dJzyRXeQZlQ%3D%3D
[sockets]: https://www.gateron.com/products/gateron-low-profile-switch-hot-swap-pcb-socket
[sod123]: https://typeractive.xyz/products/smd-diodes
[soldering101]: https://www.google.com/search?q=youtube+soldering+101
[splitkb-build-guide]: https://docs.splitkb.com/product-guides/aurora-series/build-guide
[switches]: https://nuphy.com/collections/switches/products/nuphy-wisteria-t55-low-profile-switches
[xiao]: https://wiki.seeedstudio.com/XIAO_BLE/
[zmk]: https://zmk.dev/
[zmk-xiao]: https://zmk.dev/docs/hardware#seeed_xiao
[zmkdocs]: https://zmk.dev/docs
[zmkrepo]: https://zmk.dev/docs/user-setup
[zmkstudio]: https://zmk.studio/
[ergogen]: https://ergogen.xyz
[ergonautone]: https://ergonautkb.com/docs/keyboards/ergonaut-one/intro/
[klor]: https://github.com/GEIGEIGEIST/KLOR
[ohl]: LICENSE.txt
[screws]: https://monsterbolts.com/products/mach-phil-flat-a2-m2?variant=21222571802707
[firmware]: https://github.com/ctranstrum/chuck/tree/zmk
