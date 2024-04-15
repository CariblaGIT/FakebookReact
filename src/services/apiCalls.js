const root = "https://fakebook-production-b29b.up.railway.app/api/"

export const loginService = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };

    try {
        const response = await fetch(`${root}auth/login`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

export const registerService = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };

    try {
        const response = await fetch(`${root}auth/register`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

export const timelineService = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
  
    try {
        const response = await fetch(`${root}posts/timeline`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

export const getProfileService = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
  
    try {
        const response = await fetch(`${root}users/profile`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

export const getOwnPostsService = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
  
    try {
        const response = await fetch(`${root}posts/own`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

export const updateProfileWithoutAvatarService = async (token, user) => {
    const {avatar, ...otherUserData} = user;
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(otherUserData)
    };
  
    try {
        const response = await fetch(`${root}users/profile`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

export const updateProfileWithAvatarService = async (token, user) => {
    const formData = new FormData()
    formData.append("avatar", user.avatar)
    for(const userCredential in user){
        if(userCredential !== "avatar"){
            formData.append(`${userCredential}`, `${user[userCredential]}`)
        }
    }

    const options = {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    };
  
    try {
        const response = await fetch(`${root}users/profile`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

export const makePostService = async (token, post) => {
    const formData = new FormData()
    formData.append("text", post.text)
    formData.append("post", post.post)

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData,
    };

    try {
        const response = await fetch(`${root}posts`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

export const givingLikesService = async (token, postId) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
  
    try {
        const response = await fetch(`${root}posts/like/${postId}`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}