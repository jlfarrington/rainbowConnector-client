export interface Rainbow {
    id: number;
    image: string;
    likes: number;
    lat: number;
    long: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
  }

  export interface RainbowComment {
    body: string;
    likes: number;
    id: number;
    rainbowId: number;
} 

export interface User {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  isAdmin: boolean,
  id: number,
}
