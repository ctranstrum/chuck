# Charlieflex Build Guide

If this is your first time building a custom keyboard,
you should do two things before attempting this build.

- watch a few [soldering][how-to-solder] [tutorials][soldering101]
- read through a detailed build guide like
  the one for the [splitkb.com Aurora Series][splitkb-build-guide]

The remainder of this build guide will assume a basic familiarity with the process
and will only hit upon specific items that may be different or important to note while
building the Charlieflex.

## Bill of materials

> Warning! The case files are not currently updated. They are still the models for v1.2 of the board.

| Qty   | Description                                                                                            |
| ----- | ------------------------------------------------------------------------------------------------------ |
| 1     | [Charlieflex PCB][pcb] (can be printed by uploading the [zip file][gerber] to [JLC][jlcpcb])           |
| 2     | [3D printed cases][case], top and bottom                                                               |
| 1     | [XIAO BLE][xiao] or compatible board of your choice, as long as it is supported by [ZMK][zmk-xiao]     |
| 1     | [SMD 5x5x3 tactile switch][reset] for the reset button (similar to [this][pts526] or [this][ts18])     |
| 1     | wireless only: [Alps SSSS811101 SPDT slide switch][power] for the battery on/off                       |
| 1     | wireless only: [3.7v 300mAh 502530 LiPo battery][battery] or smaller (max internal space: 5.5x27x32mm) |
| 1     | wireless only: [JST PH 2 battery jack][jst]                                                            |
| 45    | SOD-123 [1N4148W SMD diodes][sod123]                                                                   |
| 30-32 | Kailh [choc hot swap sockets][sockets]                                                                 |
| 30-32 | [Choc v1][chocv1] or [v2 switches][chocv2] of your choice                                              |
| 30-32 | [Low profile choc v1][chockeycaps] or [v2 keycaps][mxkeycaps] of your choice                           |
| 1     | Bourns [PEC11L-4115F-S0020][encoder]\* EC11 encoder with a [knob][case] of your choice                 |
| 9     | [M2 x 6mm countersunk screws][screws6mm]                                                               |
| 9     | [M2 hex nuts][hexnuts]                                                                                 |
| 3     | [M2 x 10mm countersunk screws][screws10mm]                                                             |
| 3     | [M2 heat-set inserts 3mm][heatset]                                                                     |
| 10    | [6mm x 1.5mm bumpons][bumpons]                                                                         |
| ~6mm  | [1.75mm transparent 3D printer filament][filament] for the "fiber optic" led light guide               |

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

- the color of the board; I printed mine in blue
- I also chose to hide the JLC order number, to give the board a cleaner look
- HASL can be lead-free if you are also using lead-free solder, or you can splurge for ENIG, but it's definitely not required

## Good luck

I was able to successfully build v1.2 of my board,
though I think I want to make changes to it,
so I don't want to write a build guide using photos
of an unfinished product,
but if you want to build it yourself
and you've built keyboards before,
you shouldn't really have any trouble,
just be sure to follow the symbols on the silkscreen.

All components except the encoder and the JST connector are soldered to the bottom of the board.

[battery]: https://ydlbattery.com/products/3-7v-300mah-502530-lithium-polymer-ion-battery
[bumpons]: https://www.walmart.com/ip/Small-Door-Bumpers-Self-Adhesive-Clear-Rubber-Feet-Tiny-Bumpons-1-4-Diameter-X-1-16-Thick-100-Pack-u2026/2377364014
[case]: cases/
[chockeycaps]: https://lowprokb.ca/collections/keycaps/products/ldsa-low-profile-blank-keycaps
[chocv1]: https://lowprokb.ca/collections/switches/products/ambients-silent-choc-switches
[chocv2]: https://www.lofree.co/products/hades-low-profile-pom-switches
[encoder]: https://www.mouser.com/ProductDetail/Bourns/PEC11L-4115F-S0020?qs=gk21WLQFtgRAgrgJZfpkWw%3D%3D
[filament]: https://gizmodorks.com/nylon-filament-200-g-spool/
[gerber]: pcb/chuck-gerbers.zip
[heatset]: https://www.mcmaster.com/94459A767/
[hexnuts]: https://www.getfpv.com/m2-black-metal-hex-nut-set-of-8.html
[how-to-solder]: https://www.google.com/search?q=youtube+how+to+solder
[jlc3dp]: https://jlc3dp.com/
[jlcpcb]: https://jlcpcb.com/
[jst]: https://typeractive.xyz/products/battery-jack
[kester]: https://typeractive.xyz/products/kester-solder-wire-tube
[mxkeycaps]: https://nuphy.com/collections/keycaps/products/numoji-nsa
[pcb]: pcb/
[pinecil]: https://typeractive.xyz/products/pinecil
[power]: https://typeractive.xyz/products/power-switch
[pts526]: https://www.ckswitches.com/media/2780/pts526.pdf
[reset]: https://www.aliexpress.us/item/3256806760201032.html
[screws6mm]: https://monsterbolts.com/products/mach-phil-flat-a2-m2?variant=21222571802707
[screws10mm]: https://monsterbolts.com/products/mach-phil-flat-a2-m2?variant=21222572064851
[smallencoder]: https://www.mouser.com/ProductDetail/Bourns/PES12-42S-N0024?qs=9fn1gpisni7dJzyRXeQZlQ%3D%3D
[sockets]: https://typeractive.xyz/products/hotswap-sockets?variant=45742200324327
[sod123]: https://typeractive.xyz/products/smd-diodes
[soldering101]: https://www.google.com/search?q=youtube+soldering+101
[splitkb-build-guide]: https://docs.splitkb.com/product-guides/aurora-series/build-guide
[ts18]: https://www.sameskydevices.com/product/resource/ts18.pdf
[xiao]: https://wiki.seeedstudio.com/XIAO_BLE/
[zmk-xiao]: https://zmk.dev/docs/hardware#seeed_xiao
[zmkdocs]: https://zmk.dev/docs
[zmkrepo]: https://zmk.dev/docs/user-setup
[zmkstudio]: https://zmk.studio/
[firmware]: https://github.com/ctranstrum/chuck/tree/zmk
