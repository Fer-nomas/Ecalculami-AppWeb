<script>
  export let info;
  const decodedData = decodeURIComponent(info);
  const task = JSON.parse(decodedData);
  setTimeout(() => {
    window.print();
  }, 200);
</script>

<div class="flex items-center justify-center flex-col">
  {task.name}
  <hr />
  {task.medi}
  <hr />
  {task.cons}
  <hr />
  {task.month}
</div>
