# PowerShell script to resize cursor files to 32x32
# Requires ImageMagick to be installed

$sourcePath = "public\imgs\cursors\maplestory"
$outputPath = "public\imgs\cursors\maplestory_32x32"

# Create output directory if it doesn't exist
if (-not (Test-Path $outputPath)) {
    New-Item -ItemType Directory -Path $outputPath | Out-Null
    Write-Host "Created output directory: $outputPath"
}

# Get all .cur files
$cursorFiles = Get-ChildItem -Path $sourcePath -Filter "*.cur"

Write-Host "Found $($cursorFiles.Count) cursor files to resize"

foreach ($file in $cursorFiles) {
    $inputFile = $file.FullName
    $outputFile = Join-Path $outputPath $file.Name
    
    Write-Host "Resizing: $($file.Name)"
    
    # Use ImageMagick to resize (preserves transparency)
    magick convert $inputFile -resize 32x32 $outputFile
}

Write-Host "`nAll cursors resized to 32x32!"
Write-Host "New cursors are in: $outputPath"
Write-Host "`nNext steps:"
Write-Host "1. Check the resized cursors look good"
Write-Host "2. Replace the original folder or update your CSS paths"

