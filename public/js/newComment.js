const newCommentFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (content && post_id) {
        const response = await fetch(`/api/comment`, {
            method: 'POST',
            body: JSON.stringify({ content, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to add comment');
        }
    }
};