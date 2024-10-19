#!/usr/bin/env node

// get popcorntime API servers from bittorrent DHT

const hash = "a4a9ad29e303e137ecb995c50a4e104b3e8f72e5";

// FIXME the script hangs when its done

// based on node_modules/dht-keyvalue/server.js

async function main() {

  const dhtKv = require('dht-keyvalue')

  let opts = {
   keep: true, // default = true. Keep the DHT object alive in the mainline bittorrent network
   keepalive: 3600000 // default = 3600000. Time to refresh the DHT object
  }

  const dkv = new dhtKv(opts)

  const DHT = (await import('./node_modules/bittorrent-dht/client.js')).default;

  const ed = require('bittorrent-dht-sodium')

  const dht = new DHT({ verify: ed.verify })

  dht.get(hash, function (err, res) {
   if(res == null) console.log("res is null")
   else console.log("res", res.v.toString())
  })

}

main()
