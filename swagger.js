const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');



openapi: 3.0.3
info:
  title: Backend Swagger 
  contact:
    email: irakozekelly41@gmail.com
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html
  version: 1.0.11

servers:
  - url: http://localhost:3000
tags:
  - name: User
    description: Everything about users
    externalDocs:
      description: Find out more
      url: http://swagger.io
  - name: Blog
    description: The blogs managing Api
    externalDocs:
      description: Find out more about our store
      url: http://swagger.io
  - name: Messages
    description: The messages managing Api
    externalDocs:
      description: Find out more about our store
      url: http://swagger.io
  - name: Likes
    description: The Likes managing Api
    externalDocs:
      description: Find out more about our store
      url: http://swagger.io
  - name: Comments
    description: The Comments managing Api
    externalDocs:
      description: Find out more about our store
      url: http://swagger.io
paths:
  /user/signup:
    post:
      tags:
        - User
      summary: Add a new user
      description: Add a new user to the database
      operationId: addUser
      requestBody:
        description: Create a new user in the store
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/visitor'
          application/xml:
            schema:
              $ref: '#/components/schemas/visitor'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/visitor'
        required: true
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/visitor'          
            application/xml:
              schema:
                $ref: '#/components/schemas/visitor'
        '405':
          description: Invalid input
  /user/login:
    post:
      tags:
        - User
      summary: Add a new user
      description: user login
      operationId: loginuser
      requestBody:
        description: user login
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/visitor'
          application/xml:
            schema:
              $ref: '#/components/schemas/visitor'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/visitor'
        required: true
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/visitor'          
            application/xml:
              schema:
                $ref: '#/components/schemas/visitor'
        '405':
          description: Invalid input
  /user/logout:
    post:
      tags:
        - User
      summary: Add a new user
      description: user log out
      operationId: logout user
      requestBody:
        description: user logout
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/visitor'
          application/xml:
            schema:
              $ref: '#/components/schemas/visitor'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/visitor'
        required: true
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/visitor'          
            application/xml:
              schema:
                $ref: '#/components/schemas/visitor'
        '405':
          description: Invalid input
   
  
  /get/blogs:
    get:
      tags:
        - Blog
      summary: Returns all blogs
      description: Returns an array of all the blogs
      operationId: getblogs
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                type: object
                additionalProperties:
                  type: integer
                  format: int32
  /post/blog:
    post:
      tags:
        - Blog
      summary: post a blog
      description: Place a new blog in the database
      operationId: placeblog
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/blog'
          application/xml:
            schema:
              $ref: '#/components/schemas/blog'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/blog'
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/blog'
        '405':
          description: Invalid input
  /get/blogs/{Id}:
    get:
      tags:
        - Blog
      summary: Get a blog by Id
      description: For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
      operationId: getblogById
      parameters:
        - name: Id
          in: path
          description: ID of blog that needs to be fetched
          required: true
          schema:
            type: string
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/blog'          
            application/xml:
              schema:
                $ref: '#/components/schemas/blog'
        '400':
          description: Invalid ID supplied
        '404':
          description: Order not found
  /delete/blogs/{Id}:
    delete:
      tags:
        - Blog
      summary: Delete purchase order by ID
      description: For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
      operationId: deleteOrder
      parameters:
        - name: Id
          in: path
          description: ID of the order that needs to be deleted
          required: true
          schema:
            type: string
      responses:
        '400':
          description: Invalid ID supplied
        '404':
          description: Order not found
  /put/blogs/{Id}:
    put:
      tags:
        - Blog
      summary: Delete purchase order by ID
      description: For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
      operationId: deleteblog
      parameters:
        - name: Id
          in: path
          description: ID of the order that needs to be deleted
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/blog'
          application/xml:
            schema:
              $ref: '#/components/schemas/blog'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/blog'
      responses:
        '400':
          description: Invalid ID supplied
        '404':
          description: Order not found
          
  /get/messages:
    get:
      tags:
        - Messages
      summary: Returns all message
      description: Returns an array of all the messages
      operationId: getmessages
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                type: object
                additionalProperties:
                  type: integer
                  format: int32
  /post/message:
    post:
      tags:
        - Messages
      summary: Post a message
      description: Place a new message in the database
      operationId: place message
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/message'
          application/xml:
            schema:
              $ref: '#/components/schemas/message'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/message'
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/message'
        '405':
          description: Invalid input  
  /get/likes:
    get:
      tags:
        - Likes
      summary: Returns all likes
      description: Returns an array of all the likes
      operationId: getlikes
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                type: object
                additionalProperties:
                  type: integer
                  format: int32
  /post/like:
    post:
      tags:
        - Likes
      summary: Post a like
      description: Place a new like in the database
      operationId: place like
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/like'
          application/xml:
            schema:
              $ref: '#/components/schemas/like'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/like'
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/like'
        '405':
          description: Invalid input
  /get/comments:
    get:
      tags:
        - Comments
      summary: Returns all message
      description: Returns an array of all the blogs
      operationId: getcomment
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                type: object
                additionalProperties:
                  type: integer
                  format: int32
  /post/comment:
    post:
      tags:
        - Comments
      summary: Post a message
      description: Place a new comment in the database
      operationId: place comment
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/comment'
          application/xml:
            schema:
              $ref: '#/components/schemas/comment'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/comment'
      responses:
        '200':
          description: successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/comment'
        '405':
          description: Invalid input  
components:
  schemas:
    visitor:
      type: object
      properties:
        email:
          type: string
          example: john@email.com
        password:
          type: string
          example: '12345'
    blog:
      type: object
      properties:
        id:
          type: string
          example: 10
        title:
          type: string
          example: 'in 198772'
        content:
          type: string
          example: 'international'
    message:
      type: object
      properties:
        name:
          type: string
          example: 10
        email:
          type: string
          example: 'example@gmail.com'
        content:
          type: string
          example: 'international'
    like:
      type: object
      properties:
        email:
          type: string
          example: 'example@gmail.com'
    comment:
      type: object
      properties:
        email:
          type: string
          example: 'example@gmail.com'
    
    
    

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
