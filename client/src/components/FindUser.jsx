







const FindUser = () => {

return (
  <div class="flex flex-col ">
  <div class="w-80 h-log shadow-custom rounded-custom bg-gray">
    <div class="h-log flex flex-col items-center justify-center text-white">
      <h1 class="text-xl mb-4">Make Some Friends!</h1>
      <form class="mt-5 flex mb-5 text-center">
        <label for="email"></label>
        <input type="email" placeholder="Steve Carell" id="email" class="mr-4 rounded-custom text-center text-black" name="email" required />
        <button type="submit" class="bg-gray-light w-12 rounded-custom" >Find</button>
      </form>
      <div class="w-72 h-44 bg-gray-light flex flex-col text-center rounded-custom overflow-y-auto shadow-inner-strongest ">
      </div>
    </div>
  </div>  
</div> 
)

}