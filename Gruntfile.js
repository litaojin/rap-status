
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    my_src_files: ['*', 'public/**/*', 'views/**/*'],
        
    watch: {
      options: {
        spawn: false,
      },

      src: {
        files: ['<%= my_src_files %>'],
        tasks: ['sftp:src']        
      }
    },
    
    
    sftp: {    
      
      src: {
        files: {
          './': '**/*'
        },

        options: {
          path: '/home/tao/work/web',
          host: '180.76.135.236',
          username: 'tao',
          password: '62011505',
          showProgress: true
        }
      }
    }
  
  });
  
  require('load-grunt-tasks')(grunt,{
    pattern: 'grunt-*',    
    scope: 'devDependencies'
  });

  
  grunt.registerTask('default', ['watch']);
  
  grunt.event.on('watch', function(action, filepath, target){
  	grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    //grunt.config('copy.' + target + '.src', filepath);
    //grunt.config('scp.src.files.src', filepath);
    
    if(target === 'src'){
      grunt.config('sftp.src.files', {'./': filepath});      
    }
    
  });

};