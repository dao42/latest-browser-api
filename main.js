#!/usr/bin/env node

import browserslist from 'browserslist'
import fs from 'fs'

const list = {
  'firefox': true,
  'chrome': true,
  'edge': true,
}

const latest = browserslist("last 1 version").filter(i => list[i.split(' ')[0]]).reduce((r, i) => {
	r[i.split(' ')[0]] = i.split(' ')[1] + 1 // 考虑到 caniuse-lite 通常会滞后数天，手动 + 1
	return r
}, {})

//fs.writeFileSync('./browser_compatibility_latest_browser_list.js', `export default ${JSON.stringify(latest)}`)


const dir = './build';
if (!fs.existsSync(dir)){
	fs.mkdirSync(dir);
}

fs.writeFileSync(`${dir}/list.json`, JSON.stringify({ latest: latest }))

console.log({ latest: latest })
//console.log(`Update: ${latest}`)
