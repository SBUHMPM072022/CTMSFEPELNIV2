import re

def main():
    file_path = 'src/app/admin/create-discharge/page.tsx'
    with open(file_path, 'r') as f:
        content = f.read()

    # Add import
    import_target = 'import { useFormik, FieldArray, FormikProvider } from "formik";'
    import_replacement = import_target + '\nimport NumericInput from "@/components/NumericInput";'
    if 'import NumericInput' not in content:
        content = content.replace(import_target, import_replacement)

    fields_to_format = [
        'meterQuantity', 'density', 'bunkerOrder', 'receivedOrder',
        'bargeFigureAfterLoading', 'bargeFigureBeforeDischarge',
        'shipReceived', 'robBeforeBunker', 'robAfterBunker'
    ]

    for field in fields_to_format:
        content = re.sub(
            r'<input(\s+name="' + field + '")', 
            r'<NumericInput\g<1>', 
            content
        )

    ro_fields = ['r1Val', 'r1Pct', 'r2Val', 'r2Pct', 'r3Val', 'r3Pct', 'r4Val', 'r4Pct']
    for field in ro_fields:
        content = re.sub(
            r'<input(\s+value=\{' + field + r'\.toFixed\(2\)\})',
            r'<NumericInput\g<1>',
            content
        )

    # Some replacements will have left `<NumericInput` but closing tag `</input>`
    # but the inputs in page.tsx are mostly self-closing `/>` so this should be fine.
    # Let me check if there is any `</input>` for these fields natively.
    # actually there is no `</input>` in typical react inputs.

    with open(file_path, 'w') as f:
        f.write(content)

    print("Success")

if __name__ == '__main__':
    main()
