const fs = require('fs');
const IPFS = require('ipfs');
 
const remoteConf = { 
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Bootstrap: [
      "/ip4/35.204.17.104/tcp/4001/ipfs/QmWCsxqpvYMKCeCejvXLc7TbWrraLwmAKMxWgcsKQ8xUL3"
    ],
    Addresses: {
      Swarm: [
        "/ip4/0.0.0.0/tcp/4001",
        "/ip6/::/tcp/4001",
        "/dns4/discovery.libp2p.array.io/tcp/9091/wss/p2p-websocket-star/"
      ],
      API: "/ip4/127.0.0.1/tcp/5001",
      Gateway: "/ip4/127.0.0.1/tcp/8080"
    }
  }
};

const localConf = { 
  // repo: '/Users/pidgin/dev/boilerplate/ipfsTest',
  config: {
    Addresses: {
      API: "/ip4/127.0.0.1/tcp/5001",
    }
  }
};

const ipfs = new IPFS(remoteConf);

ipfs.on('ready', async () => { 
  if (ipfs.isOnline()) {
    console.log('online');
  } else {
    console.log('offline, try to start');
    ipfs.start();
  }

  const version = await ipfs.version();

  console.log('Version:', version.version);
  
  /* upload file with progress */
  // Dapp redux store disaptches INTENT_CHANNEL_DATA_PASS(IPFS)
  // Main process orchestrate and accept data passing ACCEPT_CHANNEL_DATA_PASS(CHANNEL_ID)
  //@todo pass payload with username, get back handler info
  var rstream = fs.createReadStream('uploadFile.ts'); 
  const files = [
    {
      path: '/upload.ts',
      content: rstream
    }
  ];
  const handler = (p) => { console.log(p); };
  const options = { 
    progress: handler
  };
  ipfs.files.add(files, options, function (err, files) {
    if(err) { console.log(err); }
    console.log(files);
    
  });

 
  /* download file with progress */
  //@todo pass payload with cid, local file name, 
  // get back handler info about uploaded chunks
  const validCID = 'QmbV8Uedt7ZrwePTQjQADHJ84ifVicaKhTZJVqVBJDmydp';
  const stream = ipfs.files.getReadableStream(validCID);
  var wstream = fs.createWriteStream('myFile.vbox-extpack');
  // stream.pipe(wstream);

  stream.on('data', (file) => {
    console.log(file.size);
    // write the file's path and contents to standard out
    console.log(file.path)
    if(file.type !== 'dir') {
      // file.content.pipe(wstream);
      file.content.on('data', (chunk) => {
        console.log(chunk.byteLength);
        wstream.write(chunk);
        // console.log(data.toString())
      })
      file.content.resume()
    }
  })


});
 
ipfs.on('error', error => {
  console.error('Something went terribly wrong!', error)
});

ipfs.on('start', () => console.log('Node started!'));