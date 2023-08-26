# Models

In this directory, you can define `models/schemas` for your database and use them in `controllers`.

**NOTE:** using `mongoose` for example.

userModel.ts 
```ts
import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
});

// 3. Create a Model.
const User = model<IUser>('User', userSchema);
export default User;
```

userController.ts
```ts
import User from './models/userModel';

const usersList = await User.find({});
```
