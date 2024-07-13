"use client"

function AdBanner() {

    const data = `<script type="text/javascript">
	atOptions = {
		'key' : '480b698ae6593f025d993aa0fee4499c',
		'format' : 'iframe',
		'height' : 60,
		'width' : 468,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.topcreativeformat.com/480b698ae6593f025d993aa0fee4499c/invoke.js"></script>`

    return (
        <div
            dangerouslySetInnerHTML={{ __html: data }}
        />
    )
}

export default AdBanner
