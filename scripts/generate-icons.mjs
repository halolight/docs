#!/usr/bin/env node
/* eslint-env node */
/* global console */
import sharp from 'sharp'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '../public')

// 读取 SVG
const svgBuffer = readFileSync(join(publicDir, 'logo.svg'))

// 生成不同尺寸的 PNG
const sizes = [
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'pwa-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'og-image.png', size: 1200, height: 630 },
]

async function generateIcons() {
  for (const { name, size, height } of sizes) {
    if (name === 'og-image.png') {
      // OG image - 创建带背景的图片
      const background = sharp({
        create: {
          width: size,
          height: height,
          channels: 4,
          background: { r: 91, g: 141, b: 239, alpha: 1 },
        },
      })

      const logoResized = await sharp(svgBuffer)
        .resize(300, 300)
        .toBuffer()

      await background
        .composite([
          {
            input: logoResized,
            gravity: 'center',
          },
        ])
        .png()
        .toFile(join(publicDir, name))
    } else {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(join(publicDir, name))
    }
    console.log(`✅ Generated ${name}`)
  }
  console.log('🎉 All icons generated!')
}

generateIcons().catch(console.error)
