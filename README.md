### Quick Notes:

##### Docs

- docs are available with swagger at `docs/swagger-output.json`
- docs are available with swagger ui at `{baseurl}/api/docs`
- ERD is avaliable at `/docs/schema.mmd`

##### Commands

- some build scriptsare included in `/scripts`
- to rebuild swagger run `npm run swagger`
- to rebuild mermaid ERD run `npm run mermaid`
- to run the website run `npm start`
- check package.json for other commands

##### Basic stack

- Database: MongoDB via Mongoose
- Backend: Express (v5)
- Authentication: JWT and Bcrypt
- Validation: Joi
- File Storage: Cloudinary and Multer
- Deployment: Netlify / Serverless
