import * as Realm from 'realm-web';

const appId = process.env.REACT_APP_APP_ID;

const app = new Realm.App({ id: appId });

export default app;
