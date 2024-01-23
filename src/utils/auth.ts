export const verifyToken = async (token: string) => {
    try{
        const response = await fetch (
            "http://localhost:3500/api/verifyToken",
            {
            method: "POST",
            headers: {
                "content-Type": "application/json", 
                Authorization: `Bearer ${token}` 
            },
        });
    
        if (response.status !== 200) {
            localStorage.removeItem("userToken");
            return false;
        }

        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}