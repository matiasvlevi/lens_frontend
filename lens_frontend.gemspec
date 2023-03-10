

Gem::Specification.new do |spec|
  spec.name          = "lens_frontend"
  spec.version       = "0.0.1"
  spec.authors       = ["Matias Vazquez-Levi"]
  spec.email         = ["matiasvlevi@gmail.com"]

  spec.summary       = %q{LensProtocol is a Ruby parser and builder for the OMA protocol.}
  spec.description   = %q{A Ruby parser and builder for the OMA protocol (a.k.a. Data Communication Standard) that was developed by the Lens Processing & Technology Division of The Vision Council for interconnection of optical laboratory equipment.}
  spec.homepage      = "https://github.com/matiasvlevi/lens_frontend"

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files         = Dir.chdir(File.expand_path('..', __FILE__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }

end
