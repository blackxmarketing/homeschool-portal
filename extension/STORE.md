# Publishing Focus Buddy (unlisted) on the Chrome Web Store

Only people with the link can find or install an **unlisted** extension. Google
still reviews it, usually within a few days.

## 1. One-time setup (a parent)

1. Go to the Chrome Web Store Developer Dashboard and sign in with the Google
   account that should own the extension.
2. Accept the developer agreement and pay Google's one-time $5 registration fee.

## 2. Make the package

```
npm run ext:zip
```

This builds the live version (talking to https://137-184-200-44.sslip.io) and
writes `extension/focus-buddy-<version>.zip`. For each later update, raise the
version in `extension/version.json` first.

## 3. Upload and fill in the listing

In the dashboard: **New item** → upload the zip. Then fill in each tab.

**Store listing**
- Description:
  > Focus Buddy shows four friendly 30-minute learning timers (Math, Language
  > Arts, Science, History) on the side of Miacademy, with a teacher's voice for
  > time checks, focus check-ins, help and break buttons, and an animal buddy
  > who walks across the screen during breaks. It works only with our family's
  > own homeschool portal and is connected by a parent with a one-time code.
- Category: Education. Language: English.
- Icon: `extension/dist/icons/icon-128.png`.
- Screenshots: at least one, 1280×800. Easiest is a screenshot of Miacademy with
  the timers showing, taken on a child's computer after loading the extension by
  hand (see "Trying it before approval" below).

## Trying it before approval

On a child's computer, open `chrome://extensions`, turn on **Developer mode**,
press **Load unpacked**, and pick the `extension/dist` folder (from
`npm run ext:build`). It works the same as the store version; remove it once the
store version is installed.

**Privacy**
- Single purpose: "Shows learning timers next to Miacademy lessons for our family's
  homeschool portal."
- Permission reasons:
  - `storage`: remembers which child this computer is connected to.
  - `offscreen`: plays the teacher's spoken time checks.
  - `tts`: Chrome's own voice when the portal's voice is off.
  - Host permission for the portal: saves timer starts, pauses and finishes to
    the family's portal.
  - Miacademy pages: shows the timers beside the lessons.
- Remote code: No.
- Data usage: tick **"User activity"** (timer starts, pauses and finishes are
  sent to the family's portal), and confirm the three statements (not sold, not
  used for unrelated purposes, not used for credit).
- Privacy policy URL: `https://137-184-200-44.sslip.io/focus-buddy/privacy`

**Distribution**
- Visibility: **Unlisted**.
- Regions: all (or just the United States).

Then **Submit for review**. When it's approved, the dashboard shows the
extension's link. That link is what you open on each child's computer.

## 4. On each child's computer

1. In Chrome (signed in as that child, or the profile they use), open the link and
   press **Add to Chrome**.
2. Click the puzzle icon → pin **Focus Buddy**, click it, and type a connect code
   from the portal's Settings page.
3. Optional, so it can't be removed: Chrome can force-install it through Windows
   policy (`ExtensionInstallForcelist`). Do this yourself on each computer, using
   the extension's ID from the dashboard.
