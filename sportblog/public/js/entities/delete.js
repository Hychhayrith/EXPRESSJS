$(document).ready(()=>{
    $('.delete-category').on('click', (e)=>{
        $target = $(e.target);
        $.ajax({
            type: 'DELETE',
            url: '/manage/categories/delete/'+$target.attr('data-id'),
            success: (response)=>{
                alert("Category removed");
                window.location.href = "/manage/categories/"
            },
            error : (error)=>{
                console.log("Can't delete category. Error on the way")
            }
        })
    });

    $('.delete-article').on('click', (e)=>{
        $target = $(e.target);
        $.ajax({
            type: 'DELETE',
            url: '/manage/articles/delete/'+$target.attr('data-id'),
            success: (response)=>{
                alert("Deleted article");
                window.location.href = "/manage/articles";
            },
            error: (error)=>{
                console.log("error while loading of deleting article")
            }
        })
    });
});