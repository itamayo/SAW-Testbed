SAW-Testbed
===========

Testbed for paper: "SaW, Social Distributed Web-based Computing for Hardware-accelerated Image Analysis"

## Introduction

Our deployed SaW solution works over a client-server architecture On the server side there is a SaW
Scalable Server (S3) which manages a server cluster in order to provide a consistent, scalable and unique service front-end
to the clients. It deals with balancing the load through the different available servers. The SaW client side is completely
Web browser oriented to be executed on a connected device such as PCs, smartphones or tablets. SaW offers the Web
service providers an API to enhance their social services with seamless background image analysis tasks by means of taking
beneﬁt from the hardware resources of its big user community.

To test our system we have used a matrix multiplication (m1=1024x1024)*(m2=1024x1024) based on graphics hardware accelerations that brings WebGL.
This testbed use some nice code : http://github.com/bunions1/matrixMultiplyGpu 

## Features
 
 * Distribute large jobs
 * Use GPU for complex calculations
 * Enhance server-side infrastructure
 * Tested at smart-phone, tablets and pc (web browsed)


## Requisite

 * node.js
 * mongodb

## Quick Start

Install node.js all dependencies:
```javascript
npm install
```

Start server:
```javascript
 node server.io.js
```
Reset all queu:

```javascript
http://ip:5000/reset
```
Add new job:
```javascript
http://ip:5000/addjob/?job=name&scripts=2.js
```
Add hardware resource to server :
```javascript
http://ip:5000/add.html
```
Start Saw :
```javascript
http://ip:5000/start

```
