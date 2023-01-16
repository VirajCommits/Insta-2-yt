import React,{useState,useEffect} from 'react'
import  {faker}  from '@faker-js/faker';

function Suggestions() {
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        const suggestions = [...Array(5)].map((_, i) => ({
          userId: faker.datatype.uuid(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          avatar: faker.image.avatar(),
          password: faker.internet.password(),
          birthdate: faker.date.birthdate(),
          registeredAt: faker.date.past(),
          company:faker.company.name()
        }));
        // console.log(suggestions)
        setSuggestions(suggestions);
      }, []);
    
  return (
    <div className='mt-4 ml-10'>
        <div className="flex justify-between text-sm mb-5">
            <h3 className='text-sm font-bold text-gray-400'>
                Suggestions for You!
                <button className='text-gray-600 font-semibold'>See All!</button>
            </h3> 

        </div> 

        <div className="">
            {
                suggestions.map(profile => (
                    <div key={profile.id} className="flex items-center justify-between mt-3 ">

                        <img className='w-10 h-10 rounded-full border p-[2px] ' src={profile.avatar} alt="" />

                        <div className="flex-1 ml-4">
                            <h2 className='font-semibold text-sm'>{profile.username}</h2>
                            <h3 className='text-xs text-gray-400'>Works at {profile.company}</h3>
                        </div>

                        <button className='text-blue-400 text-sm'>Follow!</button>

                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Suggestions
