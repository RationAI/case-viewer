## Dev

Run dev mode

ENV: .env.local

Check if EmpationAPI submodule is present, if not, run:
```bash
git submodule init
git submodule update
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

Run locally in docker

ENV: Fill out in Dockerfile on specified place (marked by FILL OUT ENV VARIABLES HERE)

Check if EmpationAPI submodule is present, if not, run:
```bash
git submodule init
git submodule update
```

Build image
```bash
docker build -t case-browser-docker .
```

Run image 
```bash
docker run -p 3000:3000 case-browser-docker
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ENV

The case browser can be configured through environment variables. Here are explanations of the individual variables.

### AUTH

#### NEXT_PUBLIC_AUTH_PROVIDER_NAME (optional)
Provider name, this string is used in a sign in button to inform user about the provider that is used, can be left out.

#### NEXT_AUTH_OIDC_WELL_KNOWN (optional)
Preffered way to setup AUTH service, an OIDC provider should have a well-known endpoint, where all the necessary endpoints and values are specified. NextAuth package can find out all the necessary info from this endpoint. If left empty, you need to specify the individual endpoints.

#### NEXT_AUTH_AUTHORIZATION_ENDPOINT (optional)
Authorization endpoint of AUTH service, specify if well-known is empty.

#### NEXT_AUTH_TOKEN_ENDPOINT (required)
Token endpoint of AUTH service. Required due to the NextAuth package limits, as refresh token rotation needs to be implemented manually, and the endpoint is used for refreshing the token.

#### NEXT_AUTH_USER_ENDPOINT (optional)
User info endpoint of AUTH service, specify if well-known is empty.

#### NEXT_AUTH_OIDC_SCOPE (required)
OIDC scopes, used to specify for what resources should the app be authorized.

#### NEXT_AUTH_ISSUER (optional)
Issuer of the AUTH, used for NextAuth configuration.

#### NEXT_AUTH_CLIENT_ID (required)
Client ID of the app. Identifies the app during the AUTH process.

#### NEXT_AUTH_CLIENT_SECRET (optional)
Needed if its defined for the client ID. Used together with the client ID.

#### NEXTAUTH_URL (required)
In normal setup, the origin of the case browser (a.k.a URL where it lives). Required by the NextAuth package to find the api for AUTH. Alternatively full route to the auth api endpoint when using custom api path for auth.

#### NEXT_AUTH_SESSION_TOKEN_SECRET (required)
Some random string secret required for NextAuth. Used for encryption of JWT that stores the session.

#### NEXT_PUBLIC_ORIGIN (required)
Origin of the case browser (a.k.a URL where it lives).

#### NEXT_RUNTIME (optional)
Next runtime (e.g. "nodejs")

#### NEXT_PUBLIC_CACHE_KEY (required)
Random string used in visited functionality to generate unique href values.

#### NEXT_PUBLIC_EMPAIA_WB_URL (required)
URL of the Workbench Service (Workbench API).

#### NEXT_PUBLIC_UPLOADER_LINK (required)
URL of the EMPAIA uploader

#### NEXT_PUBLIC_APP_CONFIG (required)
App config in serialized JSON format.
o - optional
r - required
(o) project - string identifier of a project using the case browser deployment, can be ommited
(r) local_id_separartor - regex potententially containing groups to match certain parts, values of these parts can be used in hierarchy spec and search
(o) local_id_hint - string to give hint about local_id and separator
(r) hierarchy_spec - array of string keys, defining hierarchy, only keys supported by the EmpationAPI can be used
(o) hierarchy_key_overrides - object that can override names displayed in hierarchy UI for some keys and their values
format:
```
{
  <hierarchy_key>: {
    <case_value_for_key>: <override>
  },
  ...
}
```
(r) slide_mask_separator - regex that should match the character in local_id that distinguishes slides and masks
(r) search_keys - allowed keys for case search, only keys supported ny EmpationAPI can be used
(o) settings - object with string keys and boolean values for turning ON/OFF some features (currently only "allowAnnotationPresets")

Example JSON:
```
{
   "project":"",
   "local_id_separator":"(\\w{0,5})\\.(\\w{0,5})\\.\\w\\..*",
   "local_id_hint":"Separator splits id into 2 groups, named id_part_<index>, use them in specification of hierarchy, you can also use year, month, day",
   "hierarchy_spec":[
      "id_part_1",
      "id_part_2"
   ],
   "hierarchy_key_overrides":{
      "id_part_1":{
         "":"Public"
      },
      "id_part_2":{
         "":"Public"
      }
   },
   "slide_mask_separator":"\\w{0,5}\\.\\w{0,5}.(\\w)\\..*",
   "search_keys":[
      "year",
      "month",
      "day",
      "description",
      "identifier",
      "tissues",
      "stains",
      "id_part_1",
      "id_part_2"
   ],
   "settings":{
      "allowAnnotationPresets":true
   }
}
```

#### NEXT_PUBLIC_XOPAT_URL (required)
URL of the xOpat viewer.

#### NEXT_PUBLIC_XOPAT_OPEN_METHOD (optional)
xOpat can be opened by both GET and POST methods, currently only "GET" implemeted, that is also the default.

#### NEXT_PUBLIC_NO_AUTH (optional)
String "false" or "true", turns on no-auth configuration.

#### NEXT_PUBLIC_NO_AUTH_USER_ID (optional)
User ID used in no-auth config in requests to WBS. Required when using no-auth. WBS has to support no-auth mode.

