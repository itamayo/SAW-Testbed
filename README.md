SAW-Testbed
===========

Testbed for paper: "SaW, Social Distributed Web-based Computing for Hardware-accelerated Image Analysis"

Our deployed SaW solution works over a client-server architecture On the server side there is a SaW
Scalable Server (S3) which manages a server cluster in order to provide a consistent, scalable and unique service front-end
to the clients. It deals with balancing the load through the different available servers. The SaW client side is completely
Web browser oriented to be executed on a connected device such as PCs, smartphones or tablets. SaW offers the Web
service providers an API to enhance their social services with seamless background image analysis tasks by means of taking
beneﬁt from the hardware resources of its big user community.

HOW-To
===========

Install node.js all dependecies:
```javascript
npm install
```

Start server:
```javascript
 node server.io.js
```
Reset all queu:

http://ip:5000/reset

Add new job:

http://ip:5000/addjob/?job=name&scripts=2.js

Add hardware resource to server :

http://ip:5000/add.html

Start Saw :

http://ip:5000/start

