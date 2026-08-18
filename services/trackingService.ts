import {
    doc,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const subscribeTechnicianLocation = (
  technicianId: string,
  callback: (data: any) => void
) => {
  const ref = doc(
    db,
    "technicianLocations",
    technicianId
  );

  return onSnapshot(ref, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data());
    }
  });
};
