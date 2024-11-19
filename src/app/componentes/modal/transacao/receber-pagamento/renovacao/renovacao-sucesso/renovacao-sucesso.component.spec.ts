import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RenovacaoSucessoComponent } from './renovacao-sucesso.component';

describe('RenovacaoSucessoComponent', () => {
  let component: RenovacaoSucessoComponent;
  let fixture: ComponentFixture<RenovacaoSucessoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RenovacaoSucessoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RenovacaoSucessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
