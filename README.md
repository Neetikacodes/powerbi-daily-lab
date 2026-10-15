# Power BI Daily Lab (Hinglish: Hindi in Devanagari + English technical terms)
Power BI सीखने की static website: HTML, CSS, vanilla JS. No backend, no login.

## Structure
`index.html` · `style.css` · `script.js` (UI, progress) · `data.js` (lessons, case, DAX reference, interview, sample data)

## Local test
`python3 -m http.server` चलाएं और http://localhost:8000 खोलें।

## GitHub Pages
1. New repository (Public): `powerbi-daily-lab`
2. पांचों files upload करें, Commit changes
3. Settings → Pages → Deploy from a branch → main → / (root) → Save
4. ~1-2 मिनट बाद: `https://USERNAME.github.io/powerbi-daily-lab/`
सभी paths relative हैं।

## Testing checklist (browser में हाथ से करें)
- हर menu link खुलता है; mobile पर nav wrap होता है
- Lesson: Copy, quiz Check, Bookmark, Confidence, Complete
- Case: 10 steps, Hint और Solution
- Daily Challenge: Check और Answer
- Interview: Answer, सही/फिर से practice, अगला/पिछला
- Sample Data: Copy CSV, Excel में paste, Power BI में load
- Progress refresh के बाद वही रहता है; Reset काम करता है

## Verification
Sample data से बने सारे output tables को अलग Python code से दोबारा calculate करके match किया गया। DAX और M code Power BI Desktop में नहीं चलाए गए, और site browser में हाथ से test नहीं हुई।

## Limitations
9 lessons, 1 case, 8 interview questions, कोई portfolio project नहीं। Prompt बीच में कटा हुआ था ("For each function, include" पर), इसलिए आगे का हिस्सा शामिल नहीं है।
