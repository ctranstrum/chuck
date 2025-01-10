# One Up Chuck Keyboard ZMK Firmware

This repo contains the firmware for the [One Up Chuck Keyboard][chuck].

To use it, follow the instructions for [creating your own ZMK firmware repo][zmk]
but note that the One Up Chuck keyboard is an out-of-tree keyboard so you will not
find it in the list of keyboards, but don't panic, we will make the necessary
changes to get it working.

Add this module to your `config/west.yml` by adding a new entry to both
`remotes` and `projects`:

```yaml
manifest:
  remotes:
    - name: zmkfirmware
      url-base: https://github.com/zmkfirmware
    - name: ctranstrum # <-- add this for the keyboard
      url-base: https://github.com/ctranstrum
    - name: caksoylar # <-- and this for the LED
      url-base: https://github.com/caksoylar
    - name: carrefinho # <-- if you want a dongle you can use this or another adapter
      url-base: https://github.com/carrefinho
    - name: englmaxi # <-- another option for a dongle
      url-base: https://github.com/englmaxi
  projects:
    - name: zmk
      remote: zmkfirmware
      revision: main
      import: app/west.yml
    - name: chuck # <-- add this for the keyboard
      remote: ctranstrum
      revision: zmk
    - name: zmk-rgbled-widget # <-- and this for the LED
      remote: caksoylar
      revision: main
    - name: prospector-zmk-module # <-- something like this for the dongle
      remote: carrefinho
      revision: main
    - name: zmk-dongle-display # <-- alternate dongle
      remote: englmaxi
      revision: main
  self:
    path: config
```

Then, choose one of the following to add to your `build.yaml` file:

For One Up Chuck with a dongle:

```yaml
include:
  - board: seeeduino_xiao_ble
    shield: one_up_chuck_dongle prospector_adapter
    snippet: studio-rpc-usb-uart
    artifact-name: chuck-dongle
  - board: seeeduino_xiao_ble
    shield: one_up_chuck_peripheral rgbled_adapter
    artifact-name: chuck-peripheral
```

Or for One Up Chuck without a dongle:

```yaml
include:
  - board: seeeduino_xiao_ble
    shield: one_up_chuck_unibody rgbled_adapter
    snippet: studio-rpc-usb-uart
    artifact-name: chuck-unibody
```

To customize the keymap for your One Up Chuck board, you can copy the
[default keymap][keymap] from this repo to the `config` directory of
your zmk config repo and edit it from there.

[keymap]: https://github.com/ctranstrum/chuck/tree/zmk/boards/shields/chuck/one_up_chuck.keymap
[chuck]: https://github.com/ctranstrum/chuck
[zmk]: https://zmk.dev/docs/user-setup#github-repo
