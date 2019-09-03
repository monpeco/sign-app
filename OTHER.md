0 Actuallizar las dependencias
    bundle install
    npm install yarn -g
    yarn install --check-files


error 1
FATAL: Listen error: unable to monitor directories for changes. Visit https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers for info on how to fix this.

https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

error 2 
2019-09-03 23:10:33 WARN Selenium [DEPRECATION] Selenium::WebDriver::Chrome#driver_path= is deprecated. Use Selenium::WebDriver::Chrome::Service#driver_path= instead.

https://stackoverflow.com/a/57124550/6780663

gem uninstall chromedriver-helper
bundle update
gem 'webdrivers', '~> 4.0'
bundle install

error 3
Running via Spring preloader in process 691
...
`initialize': fe_sendauth: no password supplied running test


vi config/database.yml
# duplicar las credenciales de development para test

rails db:setup RAILS_ENV=test


De todas maneras una prueba para un modelo ese asi

#  test "User should save" do
#    assert User.save(email: "joe@doe.com", user_type: "normal", 
#                    active: true, comment: "simple comment").save
#  end

y otra seria algo asi

#  test "User should not save if not email is provided" do
#    assert_not User.save(user_type: "normal", 
#                    active: true, comment: "simple comment").save
#  end




